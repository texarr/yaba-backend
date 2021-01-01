import { Injectable } from '@nestjs/common';
import { CategoryTemplateEntity } from './entities/category-template.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryNotFoundException } from './exceptions/category-not-found.exception';
import { plainToClassFromExist } from 'class-transformer';
import { TemplateNameAlreadyTakenException } from './exceptions/template-name-already-taken.exception';
import { UserEntity } from '../auth/entities/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(CategoryTemplateEntity)
    private readonly categoryRepository: Repository<CategoryTemplateEntity>,
  ) {}

  async getUserCategories(
    templateName: string,
  ): Promise<CategoryTemplateEntity> {
    const existingCategories = await this.categoryRepository.findOne(
      { templateName },
      {
        relations: [
          'incomes',
          'outcomes',
          'incomes.childCategories',
          'outcomes.childCategories',
        ],
      },
    );

    if (!existingCategories) {
      throw new CategoryNotFoundException();
    }

    return existingCategories;
  }

  async createCategories(
    newCategory: CategoryTemplateEntity,
    user: UserEntity,
  ): Promise<CategoryTemplateEntity> {
    const existingCategory = await this.categoryRepository.findOne({
      templateName: newCategory.templateName,
    });

    if (existingCategory) {
      throw new TemplateNameAlreadyTakenException();
    }

    const category = new CategoryTemplateEntity();
    plainToClassFromExist(category, { ...newCategory });
    category.user = user;

    return await this.saveCategories(category);
  }

  async saveCategories(
    newCategory: CategoryTemplateEntity,
  ): Promise<CategoryTemplateEntity> {
    return await this.categoryRepository.save(newCategory);
  }
}
