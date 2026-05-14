import { CountryEntity } from 'src/country/country.entity/country.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TravelPlanEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  travelTitle!: string;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @ManyToOne(() => CountryEntity, (country) => country.travelPlans)
  @JoinColumn({ name: 'alpha3Code' })
  country!: CountryEntity;
}
