import { Module } from '@nestjs/common';
import { TravelPlanCountryService } from './travel-plan-country.service';
import { TravelPlanEntity } from 'src/travel-plan/travel-plan.entity/travel-plan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from 'src/country/country.entity/country.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TravelPlanEntity]),
    TypeOrmModule.forFeature([CountryEntity]),
  ],
  providers: [TravelPlanCountryService],
})
export class TravelPlanCountryModule {}
