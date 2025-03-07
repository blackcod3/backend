import { BadRequestException, Injectable, Logger, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
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

    } catch (error) { this.logger.error(error) }
  }

  //find all
  findAll() {
    return this.supplierRepository.find({});
  }

  //find by id
  async findOne(id: number){
    const supplier = await this.supplierRepository.findOne({
      where: { id: id},
    });

    if(!supplier) throw new BadRequestException(`Proveedor con ID ${id} no encontrado`)

    return supplier;
  }

  //Update Supplier
  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    const supplier = await this.supplierRepository.preload({
      id: id,
      ...UpdateSupplierDto
    });

    if(!supplier) throw new NotFoundException(`Proveedor con id: ${id} no encontrada!`)

    return this.supplierRepository.save(supplier);
  }

  //Delete Supplier
  async remove(id: number) {
    const supplier = await this.findOne(id)
    await this.supplierRepository.remove(supplier);
  }
}