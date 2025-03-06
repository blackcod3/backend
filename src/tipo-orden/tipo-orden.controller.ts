import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoOrdenService } from './tipo-orden.service';
import { CreateTipoOrdenDto } from './dto/create-tipo-orden.dto';
import { UpdateTipoOrdenDto } from './dto/update-tipo-orden.dto';

@Controller('tipo-orden')
export class TipoOrdenController {
  constructor(private readonly tipoOrdenService: TipoOrdenService) {}

  @Post()
  create(@Body() createTipoOrdenDto: CreateTipoOrdenDto) {
    return this.tipoOrdenService.create(createTipoOrdenDto);
  }

  @Get()
  findAll() {
    return this.tipoOrdenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoOrdenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoOrdenDto: UpdateTipoOrdenDto) {
    return this.tipoOrdenService.update(+id, updateTipoOrdenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoOrdenService.remove(+id);
  }
}
