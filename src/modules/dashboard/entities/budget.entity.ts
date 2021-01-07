import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { BudgetStatusEnum } from '../enums/budget-status.enum';
import { UserEntity } from '../../auth/entities/user.entity';

@Entity()
export class BudgetEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ApiModelProperty()
  @Column()
  name: string;

  @ApiModelProperty()
  @Column()
  status: BudgetStatusEnum;

  @ApiModelProperty()
  @Column()
  year: number;

  @ManyToOne(() => UserEntity, (user) => user.budgets)
  user: UserEntity;
}
