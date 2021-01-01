import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { CategoryTemplateEntity } from './entities/category-template.entity';
import { UserDecorator } from '../auth/decorators/user.decorator';
import { UserEntity } from '../auth/entities/user.entity';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('categories/:templateName')
  @UseGuards(AuthGuard('User'))
  @ApiResponse({
    status: 200,
    description: 'List of my categories',
    type: CategoryTemplateEntity,
  })
  async getCategories(
    @Param('templateName') templateName: string,
  ): Promise<CategoryTemplateEntity> {
    return this.dashboardService.getUserCategories(templateName);
  }

  @Post('category')
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
  async createCategory(
    @Body() category: CategoryTemplateEntity,
    @UserDecorator() user: UserEntity,
  ): Promise<CategoryTemplateEntity> {
    return this.dashboardService.createCategories(category, user);
  }
}
