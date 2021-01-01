import { UserEntity } from './modules/auth/entities/user.entity';
import { CategoryTemplateEntity } from './modules/dashboard/entities/category-template.entity';
import { CategoryEntity } from './modules/dashboard/entities/category.entity';
import { ChildCategoryEntity } from './modules/dashboard/entities/child-category.entity';

export const entities = [
  UserEntity,
  CategoryTemplateEntity,
  CategoryEntity,
  ChildCategoryEntity,
];
