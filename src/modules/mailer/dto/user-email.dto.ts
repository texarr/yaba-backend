import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UserEmailDto {
  @ApiModelProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
