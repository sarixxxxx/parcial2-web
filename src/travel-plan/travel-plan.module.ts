import { Module } from '@nestjs/common';
import { TravelPlanService } from './travel-plan.service';
import { TravelPlanController } from './travel-plan.controller';
import { CountryModule } from 'src/country/country.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelPlanEntity } from './travel-plan.entity/travel-plan.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TravelPlanEntity]),
    CountryModule,
    UserModule,
  ],
  providers: [TravelPlanService],
  controllers: [TravelPlanController],
})
export class TravelPlanModule {}
