import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, Length } from 'class-validator';

export class TravelPlanDto {
  @IsString()
  @IsNotEmpty()
  readonly travelTitle!: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  readonly startDate!: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  readonly endDate!: Date;

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  readonly alpha3Code!: string;

  @IsString()
  @IsNotEmpty()
  readonly userId!: string;
}
