import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class IconEntity {
  @ApiModelProperty()
  @PrimaryColumn()
  name: string;

  @ApiModelProperty()
  @Column()
  content: string;

  @ApiModelProperty()
  @ManyToOne(() => CategoryEntity, (category) => category.name)
  @ApiProperty({ type: () => CategoryEntity })
  category: CategoryEntity;
}
