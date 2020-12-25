import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNumber, IsObject, IsString } from 'class-validator';
import { AuthorizedUserDto } from './authorized-user.dto';

export class JwtResponseDto {
  @ApiModelProperty()
  @IsNumber()
  expiresIn: number;

  @ApiModelProperty()
  @IsString()
  accessToken: string;

  @ApiModelProperty()
  @IsString()
  id?: string;

  @ApiModelProperty()
  @IsObject()
  user?: AuthorizedUserDto;
}
