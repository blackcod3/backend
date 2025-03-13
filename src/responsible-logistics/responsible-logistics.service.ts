import { Injectable, Logger, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { CreateResponsibleLogisticDto } from './dto/create-responsible-logistic.dto';
import { UpdateResponsibleLogisticDto } from './dto/update-responsible-logistic.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ResponsibleLogistic } from 'src/index';

@Injectable()
export class ResponsibleLogisticsService {
  private readonly logger = new Logger('ResponsibleLogisticsService')

  constructor(
    @InjectRepository(ResponsibleLogistic)
    private readonly responLogisticRepository: Repository<ResponsibleLogistic>
  ){ }

  //Create Responsible Logistic
  async create(createResponsibleLogisticDto: CreateResponsibleLogisticDto) {
    try {
      const responsibleLogistic = this.responLogisticRepository.create(createResponsibleLogisticDto);
      await this.responLogisticRepository.save(responsibleLogistic);

      return responsibleLogistic;

    } catch (error) {
      this.logger.error(error);

      if (error.code === '23505') throw new ConflictException('Los datos ingresados ya existen y no pueden duplicarse.');

      throw new InternalServerErrorException('Error al crear el responsibleLogistic.');
    }
  }

  //Fin all
  async findAll({ page = 1, limit = 10 }: PaginationDto) {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    const [data, total] = await this.responLogisticRepository.findAndCount({
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
    const responsibleLogistic = await this.responLogisticRepository.findOne({
      where: { id: id},
    });
    if(!responsibleLogistic) throw new NotFoundException(`Responsable Logistica con ID(${id}) no encontrado`);
  
    return responsibleLogistic;
  }

  //Update Responsible Logistic
  async update(id: number, updateResponsibleLogisticDto: UpdateResponsibleLogisticDto) {
    const responsibleLogistic = await this.responLogisticRepository.preload({
      id: id,
      ...updateResponsibleLogisticDto
    });
    if(!responsibleLogistic) throw new NotFoundException(`Responsable Logistica con ID(${id}) no encontrado`);
  
    return this.responLogisticRepository.save(responsibleLogistic);
  }

  //Delete Responsible Logistic
  async remove(id: number) {
    const responsibleLogistic = await this.findOne(id);
    await this.responLogisticRepository.remove(responsibleLogistic);
  }
}