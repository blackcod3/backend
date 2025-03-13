import { Injectable, Logger, NotFoundException, ConflictException, InternalServerErrorException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Supplier } from 'src/index';

@Injectable()
export class SupplierService {

  private readonly logger = new Logger('SupplierService');
  
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>
  ){ }

  //Create Supplier
  async create(createSupplierDto: CreateSupplierDto) {
    try {
      const supplier = this.supplierRepository.create(createSupplierDto);
      await this.supplierRepository.save(supplier);

      return supplier;

    } catch (error) { 
      this.logger.error(error); 
      
      if (error.code === '23505') throw new ConflictException('Los datos ingresados ya existen y no pueden duplicarse.');
    
      throw new InternalServerErrorException('Error al crear el proveedor.');
    }
  }

  //find all
  async findAll({ page = 1, limit = 10 }: PaginationDto) {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    const [data, total] = await this.supplierRepository.findAndCount({
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });

    return {
      data,
      total,
      page: pageNumber,
      lastPage: Math.ceil(total / limitNumber),
    };
  }

  //find by id
  async findOne(id: number){
    const supplier = await this.supplierRepository.findOne({
      where: { id: id},
    });

    if(!supplier) throw new NotFoundException(`Proveedor con ID (${id}) no encontrado`);

    return supplier;
  }

  //Update Supplier
  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    const supplier = await this.supplierRepository.preload({
      id: id,
      ...updateSupplierDto
    });

    if(!supplier) throw new NotFoundException(`Proveedor con id: ${id} no encontrada!`);

    return this.supplierRepository.save(supplier);
  }

  //Delete Supplier
  async remove(id: number) {
    const supplier = await this.findOne(id)
    await this.supplierRepository.remove(supplier);
  }
}