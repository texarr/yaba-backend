import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsBoolean, IsString } from 'class-validator';

export class AuthorizedUserDto {
  @ApiModelProperty()
  @IsString()
  id: string;

  @ApiModelProperty()
  @IsString()
  name: string;

  @ApiModelProperty()
  @IsString()
  email: string;

  @ApiModelProperty()
  @IsBoolean()
  emailConfirmed: boolean;

  @ApiModelProperty()
  @IsString()
  confirmationToken?: string;
}
