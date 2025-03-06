import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDetalleOrdenDto } from './dto/create-detalle-orden.dto';
import { UpdateDetalleOrdenDto } from './dto/update-detalle-orden.dto';

import { DetalleOrden } from './entities/detalle-orden.entity';
import { Orden } from 'src/orden/entities/orden.entity';

@Injectable()
export class DetalleOrdenService {

  constructor(
    @InjectRepository(DetalleOrden)
    private readonly detalleOrdenRepository: Repository<DetalleOrden>,

    @InjectRepository(Orden)
    private readonly ordenRepository: Repository<Orden>,
  ){ }


  //Crear DetalleOrden
  async create(createDetalleOrdenDto: CreateDetalleOrdenDto) {
    
    const orden = await this.ordenRepository.findOne({ where: { id: createDetalleOrdenDto.id_orden } });
    if (!orden) throw new NotFoundException('Orden no encontrada');

    const detalleOrden = this.detalleOrdenRepository.create({
      ...createDetalleOrdenDto,
      orden,
    });
    return this.detalleOrdenRepository.save(detalleOrden);
    
  }

  //Traer todas
  findAll() {
    return this.detalleOrdenRepository.find({relations: ['orden']});
  }

  //Buscar por ID
  async findOne(id: number) {
    const detalleOrden = await this.detalleOrdenRepository.findOne({
      where:{id_detalle_orden:id}, relations: ['orden']
    });

    if (!detalleOrden) throw new NotFoundException(`DetalleOrden con ID ${id} no encontrada`);

    return detalleOrden;
  }

  //Actualizar DetalleOrden
  async update(id: number, updateDetalleOrdenDto: UpdateDetalleOrdenDto) {
    
    const detalleOrden = await this.findOne(id);
    Object.assign(detalleOrden, updateDetalleOrdenDto);
    return this.detalleOrdenRepository.save(detalleOrden);
  }

  //Eliminar DetalleOrden
  async remove(id: number){

    const detalleOrden = await this.findOne(id);
    return this.detalleOrdenRepository.remove(detalleOrden);
  }
}