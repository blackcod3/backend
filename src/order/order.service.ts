import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {Order, Supplier, OrderType} from 'src/index';

@Injectable()
export class OrderService {

  private readonly logger = new Logger('OrderService');

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Supplier) 
    private readonly supplierRepository: Repository<Supplier>, 

    @InjectRepository(OrderType)
    private readonly orderTypeRepository: Repository<OrderType>,
  ) { }

  //Create Order
  async create(createOrderDto: CreateOrderDto) {

    try {
      const { id_order_type, id_supplier, ...restoDatos } = createOrderDto;

      // Relations find by id
      const orderType = await this.orderTypeRepository.findOne({ where: { id: id_order_type } });
      const supplier = await this.supplierRepository.findOne({ where: { id: id_supplier } });

      if (!orderType || !supplier) throw new Error('Tipo de orden o proveedor no encontrados');

      // Relations
      const order = this.orderRepository.create({
        ...restoDatos,
        order_type: orderType,
        supplier: supplier,
      });

      await this.orderRepository.save(order);
      return order;

    } catch (error) {
      this.logger.error(error)
      throw new Error('Error al crear la orden');
    }
  }

  //find all
  findAll(){
    return  this.orderRepository.find({});
  }

  //find by id
  async findOne(id: number): Promise<Order[]> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['tipo_orden', 'proveedor']
    })
    if (!order) throw new BadRequestException(`Orden con ID ${id} no encontrada`);
    
    return [order];
  }

  //Update Order
  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.preload({
      id: id,
      ...updateOrderDto
    });

    if (!order) throw new NotFoundException(`Orden con id: ${id} no encontrada!`)

    return this.orderRepository.save(order);
  }

  //Delete Order
  async remove(id: number) {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }
}