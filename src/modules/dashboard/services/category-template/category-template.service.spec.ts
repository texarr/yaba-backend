import { Test, TestingModule } from '@nestjs/testing';
import { CategoryTemplateService } from './category-template.service';

describe('DashboardService', () => {
  let service: CategoryTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryTemplateService],
    }).compile();

    service = module.get<CategoryTemplateService>(CategoryTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
