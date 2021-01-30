import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BudgetEntity } from '../../entities/budget.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../auth/entities/user.entity';
import { NoBudgetsException } from '../../exceptions/no-budgets.exception';
import { plainToClassFromExist } from 'class-transformer';
import { BudgetAlreadyExistsException } from '../../exceptions/budget-already-exists.exception';
import { BudgetNotFoundException } from '../../exceptions/budget-not-found.exception';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectRepository(BudgetEntity)
    private readonly budgetRepository: Repository<BudgetEntity>,
  ) {}

  async getUserBudgets(user: UserEntity): Promise<BudgetEntity[]> {
    const existingBudgets = await this.budgetRepository.find({
      user: user,
      isActive: true,
    });

    if (!existingBudgets || (existingBudgets && !existingBudgets.length)) {
      throw new NoBudgetsException();
    }

    return existingBudgets;
  }

  async addUserBudgets(
    user: UserEntity,
    newBudget: BudgetEntity,
  ): Promise<BudgetEntity> {
    const existingBudget = await this.budgetRepository.findOne({
      user: user,
      name: newBudget.name,
      year: newBudget.year,
      isActive: true,
    });

    if (existingBudget) {
      throw new BudgetAlreadyExistsException();
    }

    const budget = new BudgetEntity();
    plainToClassFromExist(budget, { ...newBudget });
    budget.user = user;

    await this.saveBudget(budget);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete budget.user;

    return budget;
  }

  async saveBudget(newBudget: BudgetEntity): Promise<BudgetEntity> {
    return await this.budgetRepository.save(newBudget);
  }

  async removeBudget(
    user: UserEntity,
    budgetId: string,
  ): Promise<BudgetEntity> {
    const existingBudget = await this.budgetRepository.findOne({
      id: budgetId,
      user: user,
      isActive: true,
    });

    if (!existingBudget) {
      throw new BudgetNotFoundException();
    }

    existingBudget.isActive = false;
    return this.budgetRepository.save(existingBudget);
  }

  async getOneBudget(
    user: UserEntity,
    budgetId: string,
  ): Promise<BudgetEntity> {
    const existingBudget = await this.budgetRepository.findOne({
      where: {
        id: budgetId,
        user: user,
        isActive: true,
      },
      relations: ['months'],
    });

    if (!existingBudget) {
      throw new BudgetNotFoundException();
    }

    return existingBudget;
  }

  async patchOneBudget(
    user: UserEntity,
    updatedBudget: BudgetEntity,
  ): Promise<BudgetEntity> {
    const existingBudget = await this.budgetRepository.findOne({
      where: {
        user,
        id: updatedBudget.id,
        isActive: true,
      },
    });

    if (!existingBudget) {
      throw new BudgetNotFoundException();
    }

    return await this.budgetRepository.save(updatedBudget);
  }
}
