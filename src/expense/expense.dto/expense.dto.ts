import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class ExpenseDto {
  @IsString()
  @IsNotEmpty()
  readonly description!: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly amount!: number;

  @IsString()
  @IsNotEmpty()
  readonly category!: string;
}
