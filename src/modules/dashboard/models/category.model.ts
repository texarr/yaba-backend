import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IconModel } from './icon.model';
import { ChildCategoryModel } from './child-category.model';

export class CategoryModel {
  @ApiModelProperty()
  name: string;

  @ApiModelProperty({ type: () => IconModel })
  icon: IconModel;

  @ApiModelProperty({ type: () => ChildCategoryModel, isArray: true })
  childCategories: ChildCategoryModel[];
}
