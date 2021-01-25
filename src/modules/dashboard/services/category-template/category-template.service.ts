import { Injectable } from '@nestjs/common';
import { CategoryTemplateEntity } from '../../entities/category-template.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryNotFoundException } from '../../exceptions/category-not-found.exception';
import { plainToClassFromExist } from 'class-transformer';
import { UserEntity } from '../../../auth/entities/user.entity';
import { TemplateNotFoundException } from '../../exceptions/template-not-found.exception';
import { NoTemplatesException } from '../../exceptions/no-templates.exception';

@Injectable()
export class CategoryTemplateService {
  constructor(
    @InjectRepository(CategoryTemplateEntity)
    private readonly categoryRepository: Repository<CategoryTemplateEntity>,
  ) {}

  async getUserCategories(
    templateName: string,
  ): Promise<CategoryTemplateEntity> {
    const existingCategories = await this.categoryRepository.findOne(
      { templateName, isActive: true },
      {
        relations: [
          'incomes',
          'outcomes',
          'incomes.childCategories',
          'outcomes.childCategories',
          'months',
        ],
      },
    );

    if (!existingCategories) {
      throw new CategoryNotFoundException();
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete existingCategories.isActive;

    return existingCategories;
  }

  async createCategoryTemplate(
    newCategory: CategoryTemplateEntity,
    user: UserEntity,
  ): Promise<CategoryTemplateEntity> {
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

  async deleteUserTemplate(
    user: UserEntity,
    templateId: string,
  ): Promise<CategoryTemplateEntity> {
    const existingTemplate = await this.categoryRepository.findOne({
      templateId: templateId,
      user: user,
      isActive: true,
    });

    if (!existingTemplate) {
      throw new TemplateNotFoundException();
    }

    existingTemplate.isActive = false;
    return this.categoryRepository.save(existingTemplate);
  }

  async getUserTemplates(user: UserEntity): Promise<string[]> {
    const existingTemplates = await this.categoryRepository.find({
      user: user,
      isActive: true,
    });

    if (
      !existingTemplates ||
      (existingTemplates && !existingTemplates.length)
    ) {
      throw new NoTemplatesException();
    }

    return existingTemplates.map((template) => template.templateName);
  }
}
