import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseEntity } from 'src/expense/expense.entity/expense.entity';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';
import { TravelPlanEntity } from 'src/travel-plan/travel-plan.entity/travel-plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TravelPlanExpenseService {
  constructor(
    @InjectRepository(TravelPlanEntity)
    private readonly travelPlanRepository: Repository<TravelPlanEntity>,
    @InjectRepository(ExpenseEntity)
    private readonly expenseRepository: Repository<ExpenseEntity>,
  ) {}
  // SOLO POST Y GET

  async addExpenseTravelPlan(
    travelPlanId: string,
    expense: ExpenseEntity,
  ): Promise<TravelPlanEntity> {
    const travelPlan: TravelPlanEntity | null =
      await this.travelPlanRepository.findOne({
        where: { id: travelPlanId },
        relations: ['expenses'],
      });
    if (!travelPlan) {
      throw new BusinessLogicException(
        'The travelPlan with the given id does not exist',
        BusinessError.NOT_FOUND,
      );
    }

    travelPlan.expenses = [...(travelPlan.expenses ?? []), expense];
    return await this.travelPlanRepository.save(travelPlan);
  }

  async createExpense(expense: ExpenseEntity, travelPlanId: string) {
    try {
      await this.travelPlanRepository.findOne({
        where: { id: travelPlanId },
      });
    } catch {
      throw new BusinessLogicException(
        'Travel plan not found',
        BusinessError.NOT_FOUND,
      );
    }
    await this.addExpenseTravelPlan(travelPlanId, expense);
  }
}
