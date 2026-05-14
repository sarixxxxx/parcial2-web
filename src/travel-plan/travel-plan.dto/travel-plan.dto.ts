import { IsDate, IsNotEmpty, IsString, Length } from 'class-validator';

export class TravelPlanDto {
  @IsString()
  @IsNotEmpty()
  readonly travelTitle!: string;

  @IsDate()
  @IsNotEmpty()
  readonly startDate!: Date;

  @IsDate()
  @IsNotEmpty()
  readonly endDate!: Date;

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  readonly alpha3Code!: string;
}
