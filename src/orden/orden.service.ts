import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'

import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';

import { Orden } from './entities/orden.entity';
import { Proveedor } from 'src/proveedores/entities/proveedores.entity';
import { TipoOrden } from 'src/tipo-orden/entities/tipo-orden.entity';

@Injectable()
export class OrdenService {

  private readonly logger = new Logger('OrdenService');

  constructor(
    @InjectRepository(Orden)
    private readonly ordenRepository: Repository<Orden>,

    @InjectRepository(Proveedor) 
    private readonly proveedorRepository: Repository<Proveedor>, 

    @InjectRepository(TipoOrden)
    private readonly tipoOrdenRepository: Repository<TipoOrden>,
  ) { }

  //Crear Orden
  async create(createOrdenDto: CreateOrdenDto) {

    try {
      const { id_tipo_orden, id_proveedor, ...restoDatos } = createOrdenDto;

      // Buscar las relaciones por ID
      const tipoOrden = await this.tipoOrdenRepository.findOne({ where: { id: id_tipo_orden } });
      const proveedor = await this.proveedorRepository.findOne({ where: { id_proveedor: id_proveedor } });

      if (!tipoOrden || !proveedor) throw new Error('Tipo de orden o proveedor no encontrados');

      // Crear y asignar relaciones
      const orden = this.ordenRepository.create({
        ...restoDatos,
        tipo_orden: tipoOrden,
        proveedor: proveedor,
      });

      await this.ordenRepository.save(orden);
      return orden;

    } catch (error) {
      this.logger.error(error)
      throw new Error('Error al crear la orden');
    }
  }

  //Traer todas
  findAll(){
    return  this.ordenRepository.find({});
  }

  //Buscar por ID
  async findOne(id: number): Promise<Orden[]> {
    const orden = await this.ordenRepository.findOne({
      where: { id },
      relations: ['tipo_orden', 'proveedor']
    })
    if (!orden) throw new BadRequestException(`Orden con ID ${id} no encontrada`);
    
    return [orden];
  }

  //Actualizar Orden
  async update(id: number, updateOrdenDto: UpdateOrdenDto) {
    const orden = await this.ordenRepository.preload({
      id: id,
      ...updateOrdenDto
    });

    if (!orden) throw new NotFoundException(`Orden con id: ${id} no encontrada!`)

    return this.ordenRepository.save(orden);
  }

  //Eliminar Orden
  async remove(id: number) {
    const orden = await this.findOne(id);
    await this.ordenRepository.remove(orden);
  }
}
