/* eslint-disable prettier/prettier */
import { TravelPlanEntity } from 'src/travel-plan/travel-plan.entity/travel-plan.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class CountryEntity {
  @PrimaryColumn({ length: 3 })
  alpha3Code!: string;

  @Column()
  countryName!: string;

  @Column()
  region!: string;

  @Column()
  population!: number;

  @Column()
  flag!: string;

  @OneToMany(() => TravelPlanEntity, (travelPlan) => travelPlan.country)
  travelPlans!: TravelPlanEntity[];
}
