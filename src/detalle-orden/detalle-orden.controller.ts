import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleOrdenService } from './detalle-orden.service';
import { CreateDetalleOrdenDto } from './dto/create-detalle-orden.dto';
import { UpdateDetalleOrdenDto } from './dto/update-detalle-orden.dto';

@Controller('detalle-orden')
export class DetalleOrdenController {
  constructor(private readonly detalleOrdenService: DetalleOrdenService) {}

  @Post()
  create(@Body() createDetalleOrdenDto: CreateDetalleOrdenDto) {
    return this.detalleOrdenService.create(createDetalleOrdenDto);
  }

  @Get()
  findAll() {
    return this.detalleOrdenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleOrdenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleOrdenDto: UpdateDetalleOrdenDto) {
    return this.detalleOrdenService.update(+id, updateDetalleOrdenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleOrdenService.remove(+id);
  }
}
