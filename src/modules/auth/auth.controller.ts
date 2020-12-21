import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse } from '@nestjs/swagger';
import { UserInterface } from './models/user.interface';
import { RegisetrUserDTO } from './dto/regisetr-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {
  }

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'Account created',
    type: UserInterface
  })
  async registerUser(
    @Body() registerUserDTO: RegisetrUserDTO
  ): Promise<UserInterface> {
    return this.auth.registerUser(registerUserDTO);
  }
}
