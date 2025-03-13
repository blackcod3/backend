import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResponsibleSuppliersService } from './responsible-suppliers.service';
import { CreateResponsibleSupplierDto } from './dto/create-responsible-supplier.dto';
import { UpdateResponsibleSupplierDto } from './dto/update-responsible-supplier.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('responsible-suppliers')
export class ResponsibleSuppliersController {
  constructor(private readonly responsibleSuppliersService: ResponsibleSuppliersService) {}

  @Post()
  create(@Body() createResponsibleSupplierDto: CreateResponsibleSupplierDto) {
    return this.responsibleSuppliersService.create(createResponsibleSupplierDto);
  }

  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.responsibleSuppliersService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.responsibleSuppliersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResponsibleSupplierDto: UpdateResponsibleSupplierDto) {
    return this.responsibleSuppliersService.update(+id, updateResponsibleSupplierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.responsibleSuppliersService.remove(+id);
  }
}
