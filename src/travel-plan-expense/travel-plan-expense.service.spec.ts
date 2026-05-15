import { Test, TestingModule } from '@nestjs/testing';
import { TravelPlanExpenseService } from './travel-plan-expense.service';

describe('TravelPlanExpenseService', () => {
  let service: TravelPlanExpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelPlanExpenseService],
    }).compile();

    service = module.get<TravelPlanExpenseService>(TravelPlanExpenseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
