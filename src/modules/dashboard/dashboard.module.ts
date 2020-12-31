import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryTemplateEntity } from './entities/category-template.entity';
import { ChildCategoryEntity } from './entities/child-category.entity';
import { IconEntity } from './entities/icon.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryTemplateEntity,
      CategoryTemplateEntity,
      ChildCategoryEntity,
      IconEntity,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
