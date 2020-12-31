import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { CategoryEntity } from './category.entity';
import { UserEntity } from '../../auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CategoryTemplateEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiModelProperty()
  @Column()
  templateName: string;

  @ApiModelProperty()
  @OneToMany(() => CategoryEntity, (category) => category.name)
  incomes: CategoryEntity[];

  @ApiModelProperty()
  @OneToMany(() => CategoryEntity, (category) => category.name)
  @ApiProperty({ type: () => CategoryEntity, isArray: true })
  outcomes: CategoryEntity[];

  @ApiModelProperty()
  @ManyToOne(() => UserEntity, (user) => user.id)
  @ApiProperty({ type: () => UserEntity })
  user: UserEntity;
}
