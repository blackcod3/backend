import { BadRequestException, Injectable, Logger, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'

import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';

import { Proveedor } from './entities/proveedores.entity';

@Injectable()
export class ProveedoresService {

  private readonly logger = new Logger('ProveedoresService');
  
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>
  ){ }

  //Crear Proveedor 
  async create(createProveedoreDto: CreateProveedoreDto) {
    try {
      const proveedor = this.proveedorRepository.create(createProveedoreDto);
      await this.proveedorRepository.save(proveedor);

      return proveedor;

    } catch (error) { this.logger.error(error) }
  }

  //traer todas
  findAll() {
    return this.proveedorRepository.find({});
  }

  //Buscar por ID
  async findOne(id: number){
    const proveedor = await this.proveedorRepository.findOne({
      where: { id_proveedor: id},
    });

    if(!proveedor) throw new BadRequestException(`Proveedor con ID ${id} no encontrado`)

    return [proveedor];
  }

  //Actualizar Proveedor
  async update(id: number, updateProveedoreDto: UpdateProveedoreDto) {
    const proveedor = await this.proveedorRepository.preload({
      id_proveedor: id,
      ...UpdateProveedoreDto
    });

    if(!proveedor) throw new NotFoundException(`Proveedor con id: ${id} no encontrada!`)

    return this.proveedorRepository.save(proveedor);
  }

  //Eliminar Proveedor
  async remove(id: number) {
    const proveedor = await this.findOne(id)
    await this.proveedorRepository.remove(proveedor);
  }
}