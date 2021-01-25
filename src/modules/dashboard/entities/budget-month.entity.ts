import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { BudgetPlanSummaryEntity } from './budget-plan-summary.entity';
import { CategoryTemplateEntity } from './category-template.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class BudgetMonthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty()
  @ApiProperty()
  @Column()
  monthNo: number;

  @ApiModelProperty()
  @ApiProperty({ type: () => CategoryTemplateEntity })
  @ManyToOne(
    () => CategoryTemplateEntity,
    (categoryTemplate) => categoryTemplate.months,
  )
  monthCategory: CategoryTemplateEntity;

  @ApiModelProperty()
  @ApiProperty({ type: () => BudgetPlanSummaryEntity })
  @OneToMany(
    () => BudgetPlanSummaryEntity,
    (budgetPlanSummary) => budgetPlanSummary.summary,
  )
  monthSummary: BudgetPlanSummaryEntity;
}
