import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetailOrderDto } from './dto/create-order-detail.dto';
import { UpdateDetailOrderDto } from './dto/update-order-detail.dto';
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
    
    const order = await this.orderRepository.findOne({ where: { id: createDetailOrderDto.id } });
    if (!order) throw new NotFoundException('Orden no encontrada');

    const detailOrder = this.detailOrderRepository.create({
      ...createDetailOrderDto,
      order,
    });
    return this.detailOrderRepository.save(detailOrder);
    
  }

  //find all
  findAll() {
    return this.detailOrderRepository.find({relations: ['orden']});
  }

  //find by id
  async findOne(id: number) {
    const detailOrder = await this.detailOrderRepository.findOne({
      where:{id:id}, relations: ['orden']
    });

    if (!detailOrder) throw new NotFoundException(`detailOrder con ID ${id} no encontrada`);

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