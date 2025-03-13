import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AffectationService } from './affectation.service';
import { CreateAffectationDto } from './dto/create-affectation.dto';
import { UpdateAffectationDto } from './dto/update-affectation.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('affectation')
export class AffectationController {
  constructor(private readonly affectationService: AffectationService) {}

  @Post()
  create(@Body() createAffectationDto: CreateAffectationDto) {
    return this.affectationService.create(createAffectationDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.affectationService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.affectationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAffectationDto: UpdateAffectationDto) {
    return this.affectationService.update(+id, updateAffectationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.affectationService.remove(+id);
  }
}
