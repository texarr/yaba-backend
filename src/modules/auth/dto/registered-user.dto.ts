import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

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

  constructor(data: UserEntity) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.emailConfirmed = data.emailConfirmed;
  }
}
