import { Module } from '@nestjs/common';
import { TravelPlanExpenseService } from './travel-plan-expense.service';
import { TravelPlanExpenseController } from './travel-plan-expense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelPlanEntity } from 'src/travel-plan/travel-plan.entity/travel-plan.entity';
import { ExpenseEntity } from 'src/expense/expense.entity/expense.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TravelPlanEntity]),
    TypeOrmModule.forFeature([ExpenseEntity]),
  ],
  providers: [TravelPlanExpenseService],
  controllers: [TravelPlanExpenseController],
})
export class TravelPlanExpenseModule {}
