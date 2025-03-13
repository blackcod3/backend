import { Injectable, Logger, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { CreateResponsibleSupplierDto } from './dto/create-responsible-supplier.dto';
import { UpdateResponsibleSupplierDto } from './dto/update-responsible-supplier.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ResponsibleSupplier } from 'src/index';

@Injectable()
export class ResponsibleSuppliersService {

  private readonly logger = new Logger('ResponsibleSuppliersService')

  
  constructor(
    @InjectRepository(ResponsibleSupplier)
    private readonly responSuppliersRepository: Repository<ResponsibleSupplier>
  ) { }

  //Create Responsible Suppliers
  async create(createResponsibleSupplierDto: CreateResponsibleSupplierDto) {
    try {
      const resposibleSuppliers = this.responSuppliersRepository.create(createResponsibleSupplierDto);
      await this.responSuppliersRepository.save(resposibleSuppliers);

      return resposibleSuppliers;
    } catch (error) {
      this.logger.error(error);

      if (error.code === '23505') throw new ConflictException('Los datos ingresados ya existen y no pueden duplicarse.');

      throw new InternalServerErrorException('Error al crear el responsibleSupplier.'); 
    }
  }

  //Find all
  async findAll({ page = 1, limit = 10 }: PaginationDto) {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    const [data, total] = await this.responSuppliersRepository.findAndCount({
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

  //Find by id
  async findOne(id: number) {
    const resposibleSuppliers = await this.responSuppliersRepository.findOne({
      where: { id: id},
    });
    if(!resposibleSuppliers) throw new NotFoundException(`Responsable Proveedor con ID(${id}) no encontrado`);

    return resposibleSuppliers;
  }

  //Update Responsible Suppliers
  async update(id: number, updateResponsibleSupplierDto: UpdateResponsibleSupplierDto) {
    const responsibleSuppler = await this.responSuppliersRepository.preload({
      id: id,
      ...updateResponsibleSupplierDto
    });
    if(!responsibleSuppler) throw new NotFoundException(`Responsable Proveedor con ID(${id}) no encontrado`);

    return this.responSuppliersRepository.save(responsibleSuppler);
  }

  //Delete Responsible Suppliers
  async remove(id: number) {
    const responsibleSuppler = await this.findOne(id);
    await this.responSuppliersRepository.remove(responsibleSuppler);
  }
}