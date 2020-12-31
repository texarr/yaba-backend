import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';
import { UserInterface } from './models/user.interface';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'User') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<UserInterface> {
    const user = await this.authService.findOneUserByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException('Not authorized as user');
    }

    return user;
  }
}
