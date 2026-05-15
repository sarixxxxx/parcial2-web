import { CountryEntity } from 'src/country/country.entity/country.entity';
import { ExpenseEntity } from 'src/expense/expense.entity/expense.entity';
import { UserEntity } from 'src/user/user.entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @Column({ length: 3 })
  alpha3Code!: string;

  @ManyToOne(() => CountryEntity, (country) => country.travelPlans)
  @JoinColumn({ name: 'alpha3Code' })
  country!: CountryEntity;

  @OneToMany(() => ExpenseEntity, (expenseEntity) => expenseEntity.travelPlan)
  expenses!: ExpenseEntity[];

  @OneToOne(() => UserEntity, (user) => user.travelPlan)
  @JoinColumn()
  user!: UserEntity;
}
