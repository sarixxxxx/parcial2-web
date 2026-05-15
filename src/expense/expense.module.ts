import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseEntity } from './expense.entity/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseEntity])],
})
export class ExpenseModule {}
