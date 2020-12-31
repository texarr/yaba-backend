import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { CategoryTemplateModel } from './models/category-template.model';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('categories/:templateName')
  @UseGuards(AuthGuard('User'))
  @ApiResponse({
    status: 200,
    description: 'List of my categories',
    type: CategoryTemplateModel,
  })
  async getCategories(
    @Param('templateName') templateName: string,
  ): Promise<CategoryTemplateModel> {
    return this.dashboardService.getUserCategories(templateName);
  }

  @Post('category')
  @UseGuards(AuthGuard('User'))
  @ApiResponse({
    status: 201,
    description: 'Category template created',
    type: CategoryTemplateModel,
  })
  @ApiResponse({
    status: 409,
    description: 'Category template name already exists',
  })
  async createCategory(
    @Body() category: CategoryTemplateModel,
  ): Promise<CategoryTemplateModel | null> {
    return this.dashboardService.createCategories(category);
  }
}
