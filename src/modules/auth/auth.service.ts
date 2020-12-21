import { Injectable } from '@nestjs/common';
import { UserInterface } from './models/user.interface';
import { EmailTakenException } from './exceptions/EmailTaken.exception';
import { plainToClassFromExist } from 'class-transformer';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
  }

  async registerUser(newUser: UserInterface): Promise<UserInterface> {
    const userExists = await this.userRepository.findOne({email: newUser.email});
    if (userExists) {
      throw new EmailTakenException();
    }

    const user = new UserEntity();
    plainToClassFromExist(user, {...newUser});
    user.setPassword(newUser.password);

    return await this.userRepository.save(user);
  }
}
