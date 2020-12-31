import { Injectable } from '@nestjs/common';
import { UserInterface } from './models/user.interface';
import { EmailTakenException } from './exceptions/EmailTaken.exception';
import { plainToClassFromExist } from 'class-transformer';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailerService } from '../mailer/mailer.service';
import { ConfirmationEmailDto } from '../mailer/dto/confirmation-email.dto';
import { RegisteredUserDto } from './dto/registered-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtResponseInterface } from './interfaces/jwt-response.interface';
import { EmailNotFoundException } from './exceptions/email-not-found.exception';
import * as bcrypt from 'bcryptjs';
import { IncorrectPasswordException } from './exceptions/incorrect-password.exception';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { EmailNotConfirmedException } from './exceptions/email-not-confirmed.exception';
import { PasswordRequiredException } from './exceptions/password-required.exception';
import { UserAlreadyConfirmedException } from './exceptions/user-already-confirmed.exception';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(newUser: RegisterUserDto): Promise<UserInterface> {
    const userExists = await this.userRepository.findOne({
      email: newUser.email,
    });
    if (userExists) {
      if (!userExists.emailConfirmed) {
        throw new EmailNotConfirmedException();
      }
      throw new EmailTakenException();
    }

    const user = new UserEntity();
    plainToClassFromExist(user, { ...newUser });

    if (!newUser.password) {
      throw new PasswordRequiredException();
    }

    user.setPassword(newUser.password);

    const savedUser: UserInterface = await this.userRepository.save(user);
    if (savedUser) {
      const confirmationEmailDto: ConfirmationEmailDto = {
        name: user.name,
        email: user.email,
        confirmationToken: user.confirmationToken,
      };

      await this.mailerService.sendAccountConfirmationEmail(
        confirmationEmailDto,
      );
    }

    delete savedUser.password;
    return savedUser;
  }

  async confirmAccount(
    confirmationToken: string,
  ): Promise<RegisteredUserDto | null> {
    const existingAccount = await this.userRepository.findOne({
      confirmationToken: confirmationToken,
    });

    if (
      existingAccount &&
      existingAccount.confirmationToken === confirmationToken
    ) {
      if (existingAccount.emailConfirmed) {
        throw new UserAlreadyConfirmedException();
      }

      existingAccount.emailConfirmed = true;
      await this.userRepository.save(existingAccount);

      return new RegisteredUserDto(existingAccount);
    }

    return null;
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<JwtResponseInterface> {
    const user = await this.userRepository.findOne(
      { email: loginUserDto.email },
      {
        select: [
          'id',
          'name',
          'email',
          'password',
          'emailConfirmed',
          'confirmationToken',
        ],
      },
    );

    if (!user) {
      throw new EmailNotFoundException();
    }

    if (!user.emailConfirmed) {
      throw new EmailNotConfirmedException();
    }

    return this.handleLogin(user, loginUserDto.password);
  }

  async handleLogin(
    user: UserEntity,
    password: string,
  ): Promise<JwtResponseInterface> {
    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      throw new IncorrectPasswordException();
    }

    const jwtResponse: JwtResponseInterface = this.createToken({
      email: user.email,
      id: user.id,
    });

    const authorizedUser: UserInterface = user;
    delete authorizedUser.password;

    jwtResponse.user = authorizedUser;
    return jwtResponse;
  }

  createToken(user: JwtPayloadInterface): JwtResponseInterface {
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 3600000,
      accessToken,
    };
  }

  async findOneUserByEmail(email: string): Promise<UserInterface | undefined> {
    return await this.userRepository.findOne(
      { email, emailConfirmed: true },
      {
        select: ['id', 'name', 'email', 'password'],
      },
    );
  }
}
