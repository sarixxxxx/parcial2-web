import { Module } from '@nestjs/common';
import { TravelPlanService } from './travel-plan.service';
import { TravelPlanController } from './travel-plan.controller';
import { CountryModule } from 'src/country/country.module';

@Module({
  imports: [CountryModule],
  providers: [TravelPlanService],
  controllers: [TravelPlanController],
})
export class TravelPlanModule {}
