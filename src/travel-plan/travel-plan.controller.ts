import { Controller } from '@nestjs/common';
import { TravelPlanService } from './travel-plan.service';

@Controller('travel-plan')
export class TravelPlanController {
  constructor(private readonly travelPlanService: TravelPlanService) {}
}
