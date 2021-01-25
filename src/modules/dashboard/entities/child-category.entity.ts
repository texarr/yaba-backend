import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { CategoryEntity } from './category.entity';
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
  @Column()
  incomes: number;

  @ApiModelProperty()
  @Column()
  expenses: number;

  @ApiModelProperty()
  @Column()
  deficitOrSurplus: number;

  @ApiModelProperty()
  @ApiProperty({ type: () => CategoryEntity })
  @ManyToOne(() => CategoryEntity, (category) => category.childCategories)
  category: CategoryEntity;
}
