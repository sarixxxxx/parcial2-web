import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountryEntity } from 'src/country/country.entity/country.entity';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';
import { TravelPlanEntity } from 'src/travel-plan/travel-plan.entity/travel-plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TravelPlanCountryService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,

    @InjectRepository(TravelPlanEntity)
    private readonly travelPlanRepository: Repository<TravelPlanEntity>,
  ) {}

  async addTravelPlanCountry(alpha3Code: string, travelPlanId: string) {
    const travelPlan: TravelPlanEntity | null =
      await this.travelPlanRepository.findOne({ where: { id: travelPlanId } });
    if (!travelPlan) {
      throw new BusinessLogicException(
        'Travel Plan not found',
        BusinessError.NOT_FOUND,
      );
    }

    const country: CountryEntity | null = await this.countryRepository.findOne({
      where: { alpha3Code },
      relations: ['travelPlans'],
    });

    if (!country) {
      throw new BusinessLogicException(
        'Country not found',
        BusinessError.NOT_FOUND,
      );
    }

    country.travelPlans = [...country.travelPlans, travelPlan];
    return await this.countryRepository.save(country);
  }

  async findTravelPlanByAlpha3CodeTravelPlanId(
    alpha3Code: string,
    travelPlanId: string,
  ) {
    const travelPlan: TravelPlanEntity | null =
      await this.travelPlanRepository.findOne({ where: { id: travelPlanId } });
    if (!travelPlan) {
      throw new BusinessLogicException(
        'Travel Plan not found',
        BusinessError.NOT_FOUND,
      );
    }

    const country: CountryEntity | null = await this.countryRepository.findOne({
      where: { alpha3Code },
      relations: ['travelPlans'],
    });
    if (!country) {
      throw new BusinessLogicException(
        'Country not found',
        BusinessError.NOT_FOUND,
      );
    }

    const countryTravelPlans: TravelPlanEntity | undefined =
      country.travelPlans.find((e) => e.id === travelPlan.id);
    if (!countryTravelPlans) {
      throw new BusinessLogicException(
        'The travelPlan with the given id is not associated to the country',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return countryTravelPlans;
  }
}
