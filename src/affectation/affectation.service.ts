import { Injectable, NotFoundException} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAffectationDto } from './dto/create-affectation.dto';
import { UpdateAffectationDto } from './dto/update-affectation.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Affectation, Order } from 'src/index'

@Injectable()
export class AffectationService {

  constructor(
    @InjectRepository(Affectation)
    private readonly affectationRepository: Repository<Affectation>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) { }

  //Create affectation
  async create(createAffectationDto: CreateAffectationDto) {

      const order = await this.orderRepository.findOne({where:{id: createAffectationDto.order_id}});
      if (!order) throw new NotFoundException('Orden no encontrada');
  
      const affectation = this.affectationRepository.create({
        ...createAffectationDto,
        order,
      });
  
      return this.affectationRepository.save(affectation);
  }

  //find all
  async findAll({ page = 1, limit = 10 }: PaginationDto) {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    const [data, total] = await this.affectationRepository.findAndCount({
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
  async findOne(id: number) {
    const affectation = await this.affectationRepository.findOne({
      where:{id:id},
    });
    if(!affectation) throw new NotFoundException(`Afectacion Presupuestal con ID (${id}) no encontrada`)
    
    return affectation;
  }

  //Update affectation
  async update(id: number, updateAffectationDto: UpdateAffectationDto) {
    const affectation = await this.findOne(id);
    Object.assign(affectation, updateAffectationDto);
    return this.affectationRepository.save(affectation);
  }

  //Delete affectation
  async remove(id: number) {
    const affectation = await this.findOne(id);
    return this.affectationRepository.remove(affectation);
  }
}