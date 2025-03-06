import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'

import { CreateTipoOrdenDto } from './dto/create-tipo-orden.dto';
import { UpdateTipoOrdenDto } from './dto/update-tipo-orden.dto';

import { TipoOrden } from './entities/tipo-orden.entity';


@Injectable()
export class TipoOrdenService {

  private readonly logger = new Logger('OrdenService');

  constructor(
    @InjectRepository(TipoOrden)
    private readonly tipoOrdenRepository : Repository<TipoOrden>
  ){ }

  //Crear TipoOrden
  async create(createTipoOrdenDto: CreateTipoOrdenDto) {

    try {

      const tipoOrden = this.tipoOrdenRepository.create(createTipoOrdenDto);
      await this.tipoOrdenRepository.save(tipoOrden);

      return tipoOrden;
      
    } catch (error) { this.logger.error(error) }
  }

  //Traer todas
  findAll(){
    return this.tipoOrdenRepository.find();
  }

  //Buscar por ID
  async findOne(id: number) {
    const tipoOrden = await  this.tipoOrdenRepository.findOne({
      where: { id },
    });

    if(!tipoOrden) throw new BadRequestException(`Tipo Orden con ID ${id} no encontrada`)
    
      return [tipoOrden];
  }

  //Actualizar TipoOrden
  async update(id: number, updateTipoOrdenDto: UpdateTipoOrdenDto) {
    const tipoOrden = await this.tipoOrdenRepository.preload({
      id: id,
      ...UpdateTipoOrdenDto
    });

    if(!tipoOrden) throw new NotFoundException(`TipoOrden con id: ${id} no encontrada`)

    return this.tipoOrdenRepository.save(tipoOrden);
  }

  //Eliminar TipoOrden
  async remove(id: number) {
    const tipoOrden = await this.findOne(id)
    await this.tipoOrdenRepository.remove(tipoOrden);
  }
}
