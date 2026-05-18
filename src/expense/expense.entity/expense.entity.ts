import { TravelPlanEntity } from 'src/travel-plan/travel-plan.entity/travel-plan.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExpenseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  description!: string;

  @Column()
  amount!: number;

  @Column()
  category!: string;

  @ManyToOne(() => TravelPlanEntity, (travelPlan) => travelPlan.expenses)
  travelPlan!: TravelPlanEntity;
}
