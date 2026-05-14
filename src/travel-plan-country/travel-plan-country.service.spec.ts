import { Test, TestingModule } from '@nestjs/testing';
import { TravelPlanCountryService } from './travel-plan-country.service';

describe('TravelPlanCountryService', () => {
  let service: TravelPlanCountryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelPlanCountryService],
    }).compile();

    service = module.get<TravelPlanCountryService>(TravelPlanCountryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
