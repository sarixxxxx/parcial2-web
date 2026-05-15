/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountryEntity } from './country.entity/country.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';
import { RestCountriesProvider } from './restcountries.provider';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,
    private readonly restCountriesProvider: RestCountriesProvider,
  ) {}

  async findAll(): Promise<CountryEntity[]> {
    return await this.countryRepository.find({ relations: ['travelPlans'] });
  }

  async findByAlpha3Code(alpha3Code: string): Promise<CountryEntity | null> {
    const country: CountryEntity | null = await this.countryRepository.findOne({
      where: { alpha3Code },
      relations: ['travelPlans'],
    });
    if (!country) {
      try {
        const fetchedCountry =
          await this.restCountriesProvider.fetchByAlpha3Code(alpha3Code);
        return await this.create(fetchedCountry);
      } catch {
        throw new BusinessLogicException(
          'Country not found',
          BusinessError.NOT_FOUND,
        );
      }
    }
    return country;
  }
  async existCountryByAlpha3Code(alpha3Code: string): Promise<boolean> {
    const country: CountryEntity | null = await this.countryRepository.findOne({
      where: { alpha3Code },
    });
    if (!country) {
      try {
        const fetchedCountry =
          await this.restCountriesProvider.fetchByAlpha3Code(alpha3Code);
        await this.create(fetchedCountry);
        return true;
      } catch {
        return false;
      }
    }
    return true;
  }
  async create(country: CountryEntity): Promise<CountryEntity> {
    return await this.countryRepository.save(country);
  }

  async update(
    alpha3Code: string,
    country: CountryEntity,
  ): Promise<CountryEntity> {
    const persistedCountry: CountryEntity | null =
      await this.countryRepository.findOne({ where: { alpha3Code } });
    if (!persistedCountry) {
      throw new BusinessLogicException(
        'Country not found',
        BusinessError.NOT_FOUND,
      );
    }
    if (country.alpha3Code !== alpha3Code) {
      throw new BusinessLogicException(
        'The alpha3Code cannot be modified',
        BusinessError.BAD_REQUEST,
      );
    }
    return await this.countryRepository.save({
      ...persistedCountry,
      ...country,
    });
  }

  async delete(alpha3Code: string): Promise<void> {
    const country: CountryEntity | null = await this.countryRepository.findOne({
      where: { alpha3Code },
    });
    if (!country) {
      throw new BusinessLogicException(
        'The country with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    await this.countryRepository.remove(country);
  }
}
