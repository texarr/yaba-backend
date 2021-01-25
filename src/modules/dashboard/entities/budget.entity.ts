import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { BudgetStatusEnum } from '../enums/budget-status.enum';
import { UserEntity } from '../../auth/entities/user.entity';
import { IsOptional } from 'class-validator';
import { BudgetMonthEntity } from './budget-month.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class BudgetEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty()
  @Column({
    unique: true,
  })
  budgetId: string;

  @ApiModelProperty()
  @Column()
  name: string;

  @ApiModelProperty()
  @IsOptional()
  @Column()
  status: BudgetStatusEnum;

  @ApiModelProperty()
  @Column()
  year: number;

  @ApiModelProperty()
  @IsOptional()
  @Column()
  isActive: boolean;

  @ApiModelProperty()
  @ApiProperty({ type: () => BudgetMonthEntity, isArray: true })
  @OneToMany(
    () => BudgetMonthEntity,
    (budgetMonthEntity) => budgetMonthEntity.monthCategory,
  )
  months: BudgetMonthEntity[];

  @ApiModelProperty()
  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.budgets)
  user: UserEntity;

  constructor() {
    this.status = BudgetStatusEnum.new;
    this.isActive = true;
  }
}
