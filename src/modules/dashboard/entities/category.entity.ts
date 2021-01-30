import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChildCategoryEntity } from './child-category.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryTemplateEntity } from './category-template.entity';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiModelProperty()
  @Column()
  name: string;

  @ApiModelProperty()
  @ApiProperty()
  @Column()
  icon: string;

  @ApiModelProperty()
  @OneToMany(
    () => ChildCategoryEntity,
    (childCategory) => childCategory.category,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @ApiProperty({ type: () => ChildCategoryEntity, isArray: true })
  childCategories: ChildCategoryEntity[];

  @ManyToOne(
    () => CategoryTemplateEntity,
    (categoryTemplate) => categoryTemplate.incomes,
  )
  incomeCategories: CategoryTemplateEntity;

  @ManyToOne(
    () => CategoryTemplateEntity,
    (categoryTemplate) => categoryTemplate.outcomes,
  )
  outcomeCategories: CategoryTemplateEntity;
}
