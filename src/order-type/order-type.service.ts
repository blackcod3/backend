import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { CreateOrderTypeDto } from './dto/create-order-type.dto';
import { UpdateOrderTypeDto } from './dto/update-order-type.dto';
import { OrderType } from 'src/index';

@Injectable()
export class OrderTypeService {

  private readonly logger = new Logger('OrdenService');

  constructor(
    @InjectRepository(OrderType)
    private readonly orderTypeRepository : Repository<OrderType>
  ){ }

  //Create OrderType
  async create(createOrderTypeDto: CreateOrderTypeDto) {

    try {

      const orderType = this.orderTypeRepository.create(createOrderTypeDto);
      await this.orderTypeRepository.save(orderType);

      return orderType;
      
    } catch (error) { this.logger.error(error) }
  }

  //find all
  findAll(){
    return this.orderTypeRepository.find();
  }

  //find by id
  async findOne(id: number) {
    const orderType = await  this.orderTypeRepository.findOne({
      where: { id },
    });

    if(!orderType) throw new BadRequestException(`Tipo Orden con ID ${id} no encontrada`)
    
      return [orderType];
  }

  //Update OrderType
  async update(id: number, updateOrderTypeDto: UpdateOrderTypeDto) {
    const orderType = await this.orderTypeRepository.preload({
      id: id,
      ...UpdateOrderTypeDto
    });

    if(!orderType) throw new NotFoundException(`TipoOrden con id: ${id} no encontrada`)

    return this.orderTypeRepository.save(orderType);
  }

  //Delete OrderType
  async remove(id: number) {
    const orderType = await this.findOne(id)
    await this.orderTypeRepository.remove(orderType);
  }
}