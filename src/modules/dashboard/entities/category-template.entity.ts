import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { CategoryEntity } from './category.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../auth/entities/user.entity';
import { BudgetMonthEntity } from './budget-month.entity';

@Entity()
export class CategoryTemplateEntity {
  @PrimaryGeneratedColumn()
  templateId: string;

  @ApiModelProperty()
  @Column()
  templateName: string;

  @Column()
  isActive: boolean;

  @ApiModelProperty()
  @ApiProperty({ type: () => CategoryEntity, isArray: true })
  @OneToMany(() => CategoryEntity, (category) => category.incomeCategories)
  incomes: CategoryEntity[];

  @ApiModelProperty()
  @ApiProperty({ type: () => CategoryEntity, isArray: true })
  @OneToMany(() => CategoryEntity, (category) => category.outcomeCategories)
  outcomes: CategoryEntity[];

  @ApiModelProperty()
  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.categoryTemplates)
  user: UserEntity;

  @ApiModelProperty()
  @ApiProperty({ type: () => CategoryEntity, isArray: true })
  @OneToMany(
    () => BudgetMonthEntity,
    (budgetMonth) => budgetMonth.monthCategory,
  )
  months: BudgetMonthEntity[];

  constructor() {
    this.isActive = true;
  }
}
