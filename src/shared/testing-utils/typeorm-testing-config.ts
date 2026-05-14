/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from 'src/country/country.entity/country.entity';
import { TravelPlanEntity } from 'src/travel-plan/travel-plan.entity/travel-plan.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [CountryEntity, TravelPlanEntity],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([CountryEntity, TravelPlanEntity]),
];
