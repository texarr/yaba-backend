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

@Entity()
export class CategoryTemplateEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  templateId: string;

  @ApiModelProperty()
  @Column()
  templateName: string;

  @Column()
  isActive: boolean;

  @ApiModelProperty()
  @OneToMany(() => CategoryEntity, (category) => category.categoryTemplate, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: () => CategoryEntity, isArray: true })
  incomes: CategoryEntity[];

  @ApiModelProperty()
  @OneToMany(() => CategoryEntity, (category) => category.categoryTemplate, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: () => CategoryEntity, isArray: true })
  outcomes: CategoryEntity[];

  @ManyToOne(() => UserEntity, (user) => user.categoryTemplates)
  user: UserEntity;

  constructor() {
    this.isActive = true;
  }
}
