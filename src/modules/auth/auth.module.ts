import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { MailerService } from '../mailer/mailer.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserJwtStrategy } from './user.jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: 3600000,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, MailerService, UserJwtStrategy],
})
export class AuthModule {}
