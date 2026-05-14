import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { TravelPlanService } from './travel-plan.service';
import { TravelPlanDto } from './travel-plan.dto/travel-plan.dto';
import { TravelPlanEntity } from './travel-plan.entity/travel-plan.entity';
import { plainToInstance } from 'class-transformer';

@Controller('travel-plan')
export class TravelPlanController {
  constructor(private readonly travelPlanService: TravelPlanService) {}

  @Get()
  async findAll() {
    return await this.travelPlanService.findAll();
  }
  @Get(':travelPlanId')
  async findOne(@Param('travelPlanId') travelPlanId: string) {
    return await this.travelPlanService.findOne(travelPlanId);
  }
  @Post()
  async create(@Body() travelPlanDto: TravelPlanDto) {
    const travelPlan: TravelPlanEntity = plainToInstance(
      TravelPlanEntity,
      travelPlanDto,
    );
    return await this.travelPlanService.create(travelPlan);
  }

  @Delete(':travelPlanId')
  @HttpCode(204)
  async delete(@Param('travelPlanId') travelPlanId: string) {
    return await this.travelPlanService.delete(travelPlanId);
  }
}
