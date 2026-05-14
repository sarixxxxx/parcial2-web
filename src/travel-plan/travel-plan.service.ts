/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelPlanEntity } from './travel-plan.entity/travel-plan.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class TravelPlanService {
    constructor(
        @InjectRepository(TravelPlanEntity)
        private readonly travelPlanRepository: Repository<TravelPlanEntity>,
        
    ){}

    async findAll(): Promise<TravelPlanEntity[]>{
        return await this.travelPlanRepository.find();
    }

    async findOne(id: string): Promise<TravelPlanEntity>{
        const travelPlan: TravelPlanEntity | null = await this.travelPlanRepository.findOne(
            {
                where: {id},
                relations: ['country'],
            }
        );
        if (!travelPlan){
            throw new BusinessLogicException(
                'Travel Plan not found',
                BusinessError.NOT_FOUND,
            )
        }
        return travelPlan;
    }
    async create(travelPlan: TravelPlanEntity): Promise<TravelPlanEntity>{

    }
}
