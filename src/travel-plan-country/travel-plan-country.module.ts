import { Module } from '@nestjs/common';
import { TravelPlanCountryService } from './travel-plan-country.service';

@Module({
  providers: [TravelPlanCountryService]
})
export class TravelPlanCountryModule {}
