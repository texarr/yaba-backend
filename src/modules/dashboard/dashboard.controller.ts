import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryTemplateService } from './services/category-template/category-template.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { CategoryTemplateEntity } from './entities/category-template.entity';
import { UserDecorator } from '../auth/decorators/user.decorator';
import { UserEntity } from '../auth/entities/user.entity';
import { BudgetEntity } from './entities/budget.entity';
import { BudgetsService } from './services/budgets/budgets.service';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly categoryTemplateService: CategoryTemplateService,
    private readonly budgetsService: BudgetsService,
  ) {}

  /* Categories */
  @Get('templates')
  @UseGuards(AuthGuard('User'))
  @ApiResponse({
    status: 200,
    description: 'List of templates received',
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'You have no templates already',
  })
  async getUserTemplates(@UserDecorator() user: UserEntity): Promise<string[]> {
    return this.categoryTemplateService.getUserTemplates(user);
  }

  @Get('categories/:templateName')
  @UseGuards(AuthGuard('User'))
  @ApiResponse({
    status: 200,
    description: 'List of my template categories',
    type: CategoryTemplateEntity,
  })
  async getCategories(
    @Param('templateName') templateName: string,
  ): Promise<CategoryTemplateEntity> {
    return this.categoryTemplateService.getUserCategories(templateName);
  }

  @Post('categoryTemplate')
  @UseGuards(AuthGuard('User'))
  @ApiResponse({
    status: 201,
    description: 'Category template created',
    type: CategoryTemplateEntity,
  })
  @ApiResponse({
    status: 409,
    description: 'Category template name already exists',
  })
  async createCategoryTemplate(
    @Body() category: CategoryTemplateEntity,
    @UserDecorator() user: UserEntity,
  ): Promise<CategoryTemplateEntity> {
    return this.categoryTemplateService.createCategoryTemplate(category, user);
  }

  @Delete('template/:id')
  @UseGuards(AuthGuard('User'))
  @ApiResponse({
    status: 200,
    description: 'Template removed',
  })
  @ApiResponse({
    status: 404,
    description: 'Template not found',
  })
  async removeTemplate(
    @Param('id') templateId: string,
    @UserDecorator() user: UserEntity,
  ): Promise<CategoryTemplateEntity> {
    return this.categoryTemplateService.deleteUserTemplate(user, templateId);
  }

  /* Budgets */
  @Get('budgets')
  @UseGuards(AuthGuard('User'))
  @ApiResponse({
    status: 200,
    description: 'List of budgets',
    type: BudgetEntity,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'You have no budgets already',
  })
  async getUserBudgets(
    @UserDecorator() user: UserEntity,
  ): Promise<BudgetEntity[]> {
    return this.budgetsService.getUserBudgets(user);
  }
}
