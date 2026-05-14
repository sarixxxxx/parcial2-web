import { Module } from '@nestjs/common';
import { TravelPlanService } from './travel-plan.service';

@Module({
  providers: [TravelPlanService],
})
export class TravelPlanModule {}
