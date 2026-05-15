/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpService } from '@nestjs/axios';
import { CountryEntity } from './country.entity/country.entity';
import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';

interface RestCountryResponse {
  name: { common: string };
  region: string;
  capital?: string[];
  population: number;
  flags?: { png: string };
}

@Injectable()
export class RestCountriesProvider {
  constructor(private readonly httpService: HttpService) {}

  async fetchByAlpha3Code(alpha3Code: string): Promise<CountryEntity> {
    const url = `https://restcountries.com/v3.1/alpha/${alpha3Code}`;
    let response;
    try {
      response = await firstValueFrom(this.httpService.get(url));
    } catch {
      throw new BusinessLogicException(
        `Country with code ${alpha3Code} not found in external API`,
        BusinessError.NOT_FOUND,
      );
    }
    const data: RestCountryResponse = response.data[0];

    const country = new CountryEntity();
    country.alpha3Code = alpha3Code;
    country.countryName = data.name.common;
    country.region = data.region;
    country.capital = data.capital?.[0] ?? 'N/A';
    country.population = data.population;
    country.flag = data.flags?.png ?? '';

    return country;
  }
}
