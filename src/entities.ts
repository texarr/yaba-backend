import { UserEntity } from './modules/auth/entities/user.entity';
import { CategoryTemplateEntity } from './modules/dashboard/entities/category-template.entity';
import { CategoryEntity } from './modules/dashboard/entities/category.entity';
import { ChildCategoryEntity } from './modules/dashboard/entities/child-category.entity';
import { BudgetEntity } from './modules/dashboard/entities/budget.entity';
import { BudgetMonthEntity } from './modules/dashboard/entities/budget-month.entity';
import { BudgetPlanSummaryEntity } from './modules/dashboard/entities/budget-plan-summary.entity';

export const entities = [
  UserEntity,
  CategoryTemplateEntity,
  CategoryEntity,
  ChildCategoryEntity,
  BudgetEntity,
  BudgetMonthEntity,
  BudgetPlanSummaryEntity,
];
