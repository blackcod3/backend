import { Injectable, Logger, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { CreateResponsibleAdministrationDto } from './dto/create-responsible-administration.dto';
import { UpdateResponsibleAdministrationDto } from './dto/update-responsible-administration.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ResponsibleAdministration } from 'src/index';


@Injectable()
export class ResponsibleAdministrationService {

  private readonly logger = new Logger('ResponsibleAdministrationService')

  constructor(
    @InjectRepository(ResponsibleAdministration)
    private readonly responAdminRepository: Repository<ResponsibleAdministration>
  ){}

  //Create Responsible Administration
  async create(createRespoAdminDto: CreateResponsibleAdministrationDto) {
    try {
      const responsibleAdministration = this.responAdminRepository.create(createRespoAdminDto);
      await this.responAdminRepository.save(responsibleAdministration);

      return responsibleAdministration;

    } catch (error) {
      this.logger.error(error);

      if (error.code === '23505') throw new ConflictException('Los datos ingresados ya existen y no pueden duplicarse.');
    
      throw new InternalServerErrorException('Error al crear el responsibleAdministration.');
    }
  }

  //Find all
  async findAll({ page = 1, limit = 10 }: PaginationDto) {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    const [data, total] = await this.responAdminRepository.findAndCount({
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
    const responsibleAdministration = await this.responAdminRepository.findOne({
      where: { id: id},
    });
    if(!responsibleAdministration) throw new NotFoundException(`Responsable Administracion con ID(${id}) no encontrado`);
  
    return responsibleAdministration;
  }

  //Update Responsible Administration
  async update(id: number, updateResponsibleAdministrationDto: UpdateResponsibleAdministrationDto) {
    const responsibleAdministration = await this.responAdminRepository.preload({
      id: id,
      ...updateResponsibleAdministrationDto
    });
    if(!responsibleAdministration) throw new NotFoundException(`Responsable Administracion con ID(${id}) no encontrado`);

    return this.responAdminRepository.save(responsibleAdministration);
  }

  //Delete Responsible Administration
  async remove(id: number) {
    const responsibleAdministration = await this.findOne(id);
    await this.responAdminRepository.remove(responsibleAdministration);
  }
}