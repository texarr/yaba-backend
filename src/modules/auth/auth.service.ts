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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private mailerService: MailerService,
  ) {}

  async registerUser(newUser: UserInterface): Promise<UserInterface> {
    const userExists = await this.userRepository.findOne({
      email: newUser.email,
    });
    if (userExists) {
      throw new EmailTakenException();
    }

    const user = new UserEntity();
    plainToClassFromExist(user, { ...newUser });
    user.setPassword(newUser.password);

    const savedUser = await this.userRepository.save(user);
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
      existingAccount.emailConfirmed = true;
      await this.userRepository.save(existingAccount);

      const regesterdUserDto: RegisteredUserDto = new RegisteredUserDto(
        existingAccount,
      );

      return regesterdUserDto;
    }

    return null;
  }
}
