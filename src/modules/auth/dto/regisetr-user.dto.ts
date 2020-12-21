import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisetrUserDTO {
  @ApiModelProperty()
  id: string;

  @ApiModelProperty()
  @IsNotEmpty()
  name: string;

  @ApiModelProperty()
  @IsEmail()
  email: string;

  @ApiModelProperty()
  @IsNotEmpty()
  password: string;
}
