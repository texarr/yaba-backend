import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { CategoryEntity } from './category.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ChildCategoryEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ApiModelProperty()
  @Column()
  name: string;

  @ManyToOne(() => CategoryEntity, (category) => category.childCategories)
  @ApiProperty({ type: () => CategoryEntity })
  category: CategoryEntity;
}
