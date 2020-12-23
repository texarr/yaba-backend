import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { RegisterUserDto } from './register-user.dto';

export class RegisteredUserDto {
  @ApiModelProperty()
  id: string;

  @ApiModelProperty()
  @IsNotEmpty()
  name: string;

  @ApiModelProperty()
  @IsEmail()
  email: string;

  @ApiModelProperty()
  emailConfirmed: boolean;

  constructor(data: RegisterUserDto) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.emailConfirmed = data.emailConfirmed
  }
}
