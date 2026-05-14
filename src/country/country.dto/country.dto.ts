import { IsNotEmpty, IsNumber, IsString, IsUrl, Length } from 'class-validator';

export class CountryDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 3, { message: 'alpha3Code must be exactly 3 characters' })
  readonly alpha3Code!: string;

  @IsString()
  @IsNotEmpty()
  readonly countryName!: string;

  @IsString()
  @IsNotEmpty()
  readonly region!: string;

  @IsNumber()
  @IsNotEmpty()
  readonly population!: number;

  @IsUrl()
  @IsNotEmpty()
  readonly flag!: string;
}
