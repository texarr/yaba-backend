import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { BudgetStatusEnum } from '../enums/budget-status.enum';
import { BudgetMonthEntity } from '../entities/budget-month.entity';

export class BudgetResponseModel {
  @ApiModelProperty()
  id: string;

  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  status: BudgetStatusEnum;

  @ApiModelProperty()
  year: number;

  @ApiModelProperty()
  isActive: boolean;

  @ApiModelProperty()
  months: BudgetMonthEntity[];
}
