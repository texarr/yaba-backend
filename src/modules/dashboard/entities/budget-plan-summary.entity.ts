import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BudgetMonthEntity } from './budget-month.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class BudgetPlanSummaryEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiModelProperty()
  @Column()
  incomes: number;

  @ApiModelProperty()
  @Column()
  expenses: number;

  @ApiModelProperty()
  @Column()
  deficitOrSurplus: number;

  @ApiModelProperty()
  @ApiProperty({ type: () => BudgetMonthEntity })
  @ManyToOne(() => BudgetMonthEntity, (budgetMonth) => budgetMonth.monthSummary)
  summary: BudgetMonthEntity;
}
