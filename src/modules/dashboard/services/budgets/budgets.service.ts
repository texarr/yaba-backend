import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BudgetEntity } from '../../entities/budget.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../auth/entities/user.entity';
import { NoBudgetsException } from '../../exceptions/no-budgets.exception';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectRepository(BudgetEntity)
    private readonly budgetRepository: Repository<BudgetEntity>,
  ) {}

  async getUserBudgets(user: UserEntity): Promise<BudgetEntity[]> {
    const existingBudgets = await this.budgetRepository.find({
      user: user,
    });

    if (!existingBudgets || (existingBudgets && !existingBudgets.length)) {
      throw new NoBudgetsException();
    }

    return existingBudgets;
  }
}
