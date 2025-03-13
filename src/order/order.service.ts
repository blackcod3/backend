import { Injectable, Logger, NotFoundException, InternalServerErrorException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm'
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Order, Supplier, Authorization } from 'src/index';

@Injectable()
export class OrderService {

  private readonly logger = new Logger('OrderService');

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,

    @InjectRepository(Authorization)
    private readonly authorizationRepository: Repository<Authorization>,
  ) { }

  //Create Order
  async create(createOrderDto: CreateOrderDto) {

    try {
      const { supplier_id, authorization_ids, ...resData } = createOrderDto;

      // Relations find by id
      const supplier = await this.supplierRepository.findOne({ where: { id: supplier_id } });
      if (!supplier) throw new NotFoundException(`Proveedor no encontrado`);

      // Relations
      const order = this.orderRepository.create({
        ...resData,
        supplier: supplier,
      });

      await this.orderRepository.save(order);
      return order;

    } catch (error) {
      this.logger.error(error)

      if (error.code === '23505') throw new ConflictException('Los datos ingresados ya existen y no pueden duplicarse.');
      
      throw new InternalServerErrorException('Error al crear la orden');
    }
  }

  //find all
  async findAll({ page = 1, limit = 10 }: PaginationDto) {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    const [data, total] = await this.orderRepository.findAndCount({
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
      order: {
        id: 'ASC',
      },
      relations: ['supplier','details','affectations','billings', 'authorizations'],
    });

    return {
      data,
      total,
      page: pageNumber,
      lastPage: Math.ceil(total / limitNumber),
    };
  }

  //find by id
  async findOne(id: number): Promise<Order[]> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['supplier','details','affectations','billings', 'authorizations'],
    })
    if (!order) throw new NotFoundException(`Orden con ID(${id}) no encontrada`);

    return [order];
  }

  //Update Order
  async update(id: number, updateOrderDto: UpdateOrderDto) {

    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['supplier', 'authorizations'],
    });

    if (!order) throw new NotFoundException(`Orden con id: ${id} no encontrada!`)

    if (updateOrderDto.supplier_id) {
      const supplier = await this.supplierRepository.findOne({
        where: { id: updateOrderDto.supplier_id },
      });
      if (!supplier)throw new NotFoundException(`Proveedor con id: ${updateOrderDto.supplier_id} no encontrado!`);
      
      order.supplier = supplier;
    }

    if (updateOrderDto.authorization_ids) {
      const authorizations = await this.authorizationRepository.find({
        where: { id: In(updateOrderDto.authorization_ids)},
      });
      order.authorizations = authorizations;
    }
    
    Object.assign(order, updateOrderDto);

    return this.orderRepository.save(order);
  }

  //Delete Order
  async remove(id: number) {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }
}