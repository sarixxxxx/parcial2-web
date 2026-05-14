import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class TravelPlanDto {
  @IsString()
  @IsNotEmpty()
  readonly id!: string;

  @IsString()
  @IsNotEmpty()
  readonly travelTitle!: string;

  @IsDate()
  @IsNotEmpty()
  readonly startDate!: Date;

  @IsDate()
  @IsNotEmpty()
  readonly endDate!: Date;
}
