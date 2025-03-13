import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResponsibleLogisticsService } from './responsible-logistics.service';
import { CreateResponsibleLogisticDto } from './dto/create-responsible-logistic.dto';
import { UpdateResponsibleLogisticDto } from './dto/update-responsible-logistic.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('responsible-logistics')
export class ResponsibleLogisticsController {
  constructor(private readonly responsibleLogisticsService: ResponsibleLogisticsService) {}

  @Post()
  create(@Body() createResponsibleLogisticDto: CreateResponsibleLogisticDto) {
    return this.responsibleLogisticsService.create(createResponsibleLogisticDto);
  }

  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.responsibleLogisticsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.responsibleLogisticsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResponsibleLogisticDto: UpdateResponsibleLogisticDto) {
    return this.responsibleLogisticsService.update(+id, updateResponsibleLogisticDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.responsibleLogisticsService.remove(+id);
  }
}
