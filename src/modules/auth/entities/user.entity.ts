import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { CategoryTemplateEntity } from '../../dashboard/entities/category-template.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { BudgetEntity } from '../../dashboard/entities/budget.entity';

@Entity()
export class UserEntity {
  @ApiModelProperty()
  @PrimaryColumn()
  id: string;

  @ApiModelProperty()
  @Column()
  name: string;

  @ApiModelProperty()
  @Column({
    unique: true,
  })
  email: string;

  @ApiModelProperty()
  @Column({ select: false })
  password: string;

  @ApiModelProperty()
  @Column()
  emailConfirmed: boolean;

  @ApiModelProperty()
  @Column()
  confirmationToken: string;

  @OneToMany(
    () => CategoryTemplateEntity,
    (categoryTemplate) => categoryTemplate.user,
  )
  categoryTemplates: CategoryTemplateEntity[];

  @OneToMany(() => BudgetEntity, (budgetEntity) => budgetEntity.user)
  budgets: BudgetEntity[];

  constructor() {
    this.id = uuid4();
    this.emailConfirmed = false;
    this.confirmationToken = uuid4();
  }

  setPassword(password: string) {
    this.password = bcrypt.hashSync(password, 10);
  }
}
