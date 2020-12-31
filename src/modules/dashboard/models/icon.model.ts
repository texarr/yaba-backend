import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class IconModel {
  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  content: string;
}
