import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IconEntity } from './icon.entity';
import { ChildCategoryEntity } from './child-category.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CategoryEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiModelProperty()
  @Column()
  name: string;

  @ApiModelProperty()
  @OneToMany(() => IconEntity, (icon) => icon.name)
  @ApiProperty({ type: () => IconEntity })
  icon: IconEntity;

  @ApiModelProperty()
  @OneToMany(() => ChildCategoryEntity, (childCategory) => childCategory.name)
  @ApiProperty({ type: () => ChildCategoryEntity, isArray: true })
  childCategories: ChildCategoryEntity[];
}
