import { TravelPlanEntity } from 'src/travel-plan/travel-plan.entity/travel-plan.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @OneToOne(() => TravelPlanEntity, (travelPlan) => travelPlan.user)
  travelPlan!: TravelPlanEntity;
}
