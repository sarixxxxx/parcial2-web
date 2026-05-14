import { Test, TestingModule } from '@nestjs/testing';
import { TravelPlanService } from './travel-plan.service';

describe('TravelPlanService', () => {
  let service: TravelPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelPlanService],
    }).compile();

    service = module.get<TravelPlanService>(TravelPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
