import { Injectable } from '@nestjs/common';
import { CategoryTemplateEntity } from './entities/category-template.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryNotFoundException } from './exceptions/category-not-found.exception';
import { plainToClassFromExist } from 'class-transformer';
import { CategoryTemplateModel } from './models/category-template.model';
import { TemplateNameAlreadyTakenException } from './exceptions/template-name-already-taken.exception';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(CategoryTemplateEntity)
    private readonly categoryRepository: Repository<CategoryTemplateEntity>,
  ) {}

  async getUserCategories(
    templateName: string,
  ): Promise<CategoryTemplateModel> {
    const existingCategories = await this.categoryRepository.findOne({
      templateName,
    });

    if (!existingCategories) {
      throw new CategoryNotFoundException();
    }

    console.log(existingCategories);
    return existingCategories;
  }

  async createCategories(
    newCategory: CategoryTemplateModel,
  ): Promise<CategoryTemplateModel | null> {
    const existingCategory = await this.categoryRepository.findOne({
      templateName: newCategory.templateName,
    });

    if (existingCategory) {
      throw new TemplateNameAlreadyTakenException();
    }

    // then generate new Category
    // plainToClassFromExist
    const category = new CategoryTemplateEntity();
    plainToClassFromExist(category, { ...newCategory });

    return await this.saveCategories(category);
  }

  async saveCategories(
    newCategory: CategoryTemplateEntity,
  ): Promise<CategoryTemplateEntity> {
    return await this.categoryRepository.save(newCategory);
  }
}
