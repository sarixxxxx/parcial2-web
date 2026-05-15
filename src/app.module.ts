import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './country/country.module';
import { TravelPlanModule } from './travel-plan/travel-plan.module';
import { CountryEntity } from './country/country.entity/country.entity';
import { TravelPlanEntity } from './travel-plan/travel-plan.entity/travel-plan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelPlanCountryModule } from './travel-plan-country/travel-plan-country.module';
import { ExpenseModule } from './expense/expense.module';
import { TravelPlanExpenseModule } from './travel-plan-expense/travel-plan-expense.module';
import { ExpenseEntity } from './expense/expense.entity/expense.entity';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity/user.entity';
import { AccessLogMiddleware } from './shared/middleware/access-log.middleware';

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
      database: 'travel_plans_db2',
      entities: [CountryEntity, TravelPlanEntity, ExpenseEntity, UserEntity],
      dropSchema: true,
      synchronize: true,
    }),
    TravelPlanCountryModule,
    ExpenseModule,
    TravelPlanExpenseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessLogMiddleware).forRoutes('*');
  }
}
