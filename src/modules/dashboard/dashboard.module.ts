import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { CategoryTemplateService } from './services/category-template/category-template.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryTemplateEntity } from './entities/category-template.entity';
import { ChildCategoryEntity } from './entities/child-category.entity';
import { CategoryEntity } from './entities/category.entity';
import { BudgetsService } from './services/budgets/budgets.service';
import { BudgetEntity } from './entities/budget.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryEntity,
      CategoryTemplateEntity,
      ChildCategoryEntity,
      BudgetEntity,
    ]),
  ],
  controllers: [DashboardController],
  providers: [CategoryTemplateService, BudgetsService],
  exports: [CategoryTemplateService, BudgetsService],
})
export class DashboardModule {}
