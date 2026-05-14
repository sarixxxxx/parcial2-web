import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './country/country.module';
import { TravelPlanModule } from './travel-plan/travel-plan.module';
import { CountryEntity } from './country/country.entity/country.entity';
import { TravelPlanEntity } from './travel-plan/travel-plan.entity/travel-plan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CountryModule,
    TravelPlanModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'sara',
      database: 'travel_plans_db',
      entities: [CountryEntity, TravelPlanEntity],
      dropSchema: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
