import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse } from '@nestjs/swagger';
import { UserInterface } from './models/user.interface';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisteredUserDto } from './dto/registered-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtResponseInterface } from './interfaces/jwt-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'Account created',
    type: UserInterface,
  })
  async registerUser(
    @Body() registerUserDTO: RegisterUserDto,
  ): Promise<UserInterface> {
    return this.auth.registerUser(registerUserDTO);
  }

  @Get('confirm/:confirmationToken')
  @ApiResponse({
    status: 200,
    description: 'Account confirmed',
    type: RegisteredUserDto,
  })
  async confirmAccount(
    @Param('confirmationToken') confirmationToken: string,
  ): Promise<RegisteredUserDto | null> {
    return await this.auth.confirmAccount(confirmationToken);
  }

  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'Logged in successfully',
    type: JwtResponseInterface,
  })
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<JwtResponseInterface> {
    return await this.auth.loginUser(loginUserDto);
  }
}
