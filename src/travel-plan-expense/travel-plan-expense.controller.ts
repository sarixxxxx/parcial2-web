import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { TravelPlanExpenseService } from './travel-plan-expense.service';
import { ExpenseDto } from 'src/expense/expense.dto/expense.dto';
import { ExpenseEntity } from 'src/expense/expense.entity/expense.entity';
import { plainToInstance } from 'class-transformer';

@Controller('travel-plan')
@UseInterceptors(BusinessErrorsInterceptor)
export class TravelPlanExpenseController {
  constructor(
    private readonly travelPlanExpenseService: TravelPlanExpenseService,
  ) {}
  @Put(':travelPlanId/expenses')
  async createExpense(
    @Param('travelPlanId') travelPlanId,
    @Body() expenseDto: ExpenseDto,
  ) {
    const expense: ExpenseEntity = plainToInstance(ExpenseEntity, expenseDto);
    return this.travelPlanExpenseService.createExpense(expense, travelPlanId);
  }
}
