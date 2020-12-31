import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ChildCategoryEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiModelProperty()
  @Column()
  name: string;

  @ApiModelProperty()
  @ManyToOne(() => CategoryEntity, (category) => category.name)
  @ApiProperty({ type: () => CategoryEntity })
  category: CategoryEntity;
}
