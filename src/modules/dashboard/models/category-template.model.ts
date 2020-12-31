import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { CategoryModel } from './category.model';

export class CategoryTemplateModel {
  @ApiModelProperty()
  templateName: string;

  @ApiModelProperty({ type: () => CategoryModel, isArray: true })
  incomes: CategoryModel[];

  @ApiModelProperty({ type: () => CategoryModel, isArray: true })
  outcomes: CategoryModel[];
}
