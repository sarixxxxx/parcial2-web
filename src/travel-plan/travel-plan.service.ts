/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelPlanEntity } from './travel-plan.entity/travel-plan.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';
import { CountryService } from 'src/country/country.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TravelPlanService {
  constructor(
    @InjectRepository(TravelPlanEntity)
    private readonly travelPlanRepository: Repository<TravelPlanEntity>,
    private readonly countryService: CountryService,
    private readonly userService: UserService,
  ) {}

  async findAll(): Promise<TravelPlanEntity[]> {
    return await this.travelPlanRepository.find();
  }

  async findOne(id: string): Promise<TravelPlanEntity> {
    const travelPlan: TravelPlanEntity | null =
      await this.travelPlanRepository.findOne({
        where: { id },
        relations: ['country', 'user'],
      });
    if (!travelPlan) {
      throw new BusinessLogicException(
        'Travel Plan not found',
        BusinessError.NOT_FOUND,
      );
    }
    return travelPlan;
  }
  async create(travelPlan: TravelPlanEntity): Promise<TravelPlanEntity> {
    try {
      await this.userService.findOne(travelPlan.id);
    } catch {
      throw new BusinessLogicException(
        'User not found for the new Travel Plan',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    const existsCountry: boolean =
      await this.countryService.existCountryByAlpha3Code(travelPlan.alpha3Code);

    if (!existsCountry) {
      throw new BusinessLogicException(
        'Country not found for the new Travel Plan',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.travelPlanRepository.save(travelPlan);
  }

  async delete(travelPlanId: string): Promise<void> {
    const travelPlan: TravelPlanEntity | null =
      await this.travelPlanRepository.findOne({
        where: { id: travelPlanId },
      });
    if (!travelPlan) {
      throw new BusinessLogicException(
        'The travel plan with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    await this.travelPlanRepository.remove(travelPlan);
  }
}
