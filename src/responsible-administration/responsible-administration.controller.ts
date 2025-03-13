import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResponsibleAdministrationService } from './responsible-administration.service';
import { CreateResponsibleAdministrationDto } from './dto/create-responsible-administration.dto';
import { UpdateResponsibleAdministrationDto } from './dto/update-responsible-administration.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('responsible-administration')
export class ResponsibleAdministrationController {
  constructor(private readonly responsibleAdministrationService: ResponsibleAdministrationService) {}

  @Post()
  create(@Body() createResponsibleAdministrationDto: CreateResponsibleAdministrationDto) {
    return this.responsibleAdministrationService.create(createResponsibleAdministrationDto);
  }

  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.responsibleAdministrationService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.responsibleAdministrationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResponsibleAdministrationDto: UpdateResponsibleAdministrationDto) {
    return this.responsibleAdministrationService.update(+id, updateResponsibleAdministrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.responsibleAdministrationService.remove(+id);
  }
}
