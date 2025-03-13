import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetailOrderDto } from './dto/create-order-detail.dto';
import { UpdateDetailOrderDto } from './dto/update-order-detail.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import {DetailOrder, Order} from 'src/index'

@Injectable()
export class DetailOrderService {

  constructor(
    @InjectRepository(DetailOrder)
    private readonly detailOrderRepository: Repository<DetailOrder>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ){ }

  //Create DetailOrder
  async create(createDetailOrderDto: CreateDetailOrderDto ) {

      const order = await this.orderRepository.findOne({ where: { id: createDetailOrderDto.order_id} });
      if (!order) throw new NotFoundException(`Orden no encontrada`);
  
      const detailOrder = this.detailOrderRepository.create({
        ...createDetailOrderDto,
        order,
      });
      return this.detailOrderRepository.save(detailOrder);
  }

  //find all
  async findAll({ page = 1, limit = 10 }: PaginationDto) {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    const [data, total] = await this.detailOrderRepository.findAndCount({
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
    const detailOrder = await this.detailOrderRepository.findOne({
      where:{id:id},
    });

    if (!detailOrder) throw new NotFoundException(`detailOrder con ID (${id}) no encontrado`);

    return detailOrder;
  }

  //Update detailOrder
  async update(id: number, updateDetailOrderDto: UpdateDetailOrderDto) {
    const detailOrder = await this.findOne(id);
    Object.assign(detailOrder, updateDetailOrderDto);
    return this.detailOrderRepository.save(detailOrder);
  }

  //Delete detailOrder
  async remove(id: number){

    const detailOrder = await this.findOne(id);
    return this.detailOrderRepository.remove(detailOrder);
  }
}