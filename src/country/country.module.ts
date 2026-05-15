import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from './country.entity/country.entity';
import { RestCountriesProvider } from './restcountries.provider';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [CountryService, RestCountriesProvider],
  imports: [TypeOrmModule.forFeature([CountryEntity]), HttpModule],
  exports: [CountryService],
})
export class CountryModule {}
