import { Injectable, NotFoundException, Logger, ConflictException, InternalServerErrorException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Billing, Order } from 'src/index'

@Injectable()
export class BillingService {

  private readonly logger = new Logger('BillingService');

  constructor(
    @InjectRepository(Billing)
    private readonly billingRepository: Repository<Billing>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) { }

  //Create Billing
  async create(createBillingDto: CreateBillingDto) {

    try {
      const order = await this.orderRepository.findOne({ where: { id: createBillingDto.order_id } });
      if (!order) throw new NotFoundException('Orden no encontrada');
  
      const billing = this.billingRepository.create({
        ...createBillingDto,
        order,
      });
      return this.billingRepository.save(billing);

    } catch (error) {
      this.logger.error(error);

      if (error.code === '23505') throw new ConflictException('Los datos ingresados ya existen y no pueden duplicarse.');

      throw new InternalServerErrorException('Error al crear la facturacion');
    }
  }

  //find all
  async findAll({ page = 1, limit = 10 }: PaginationDto) {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    const [data, total] = await this.billingRepository.findAndCount({
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
    const billing = await this.billingRepository.findOne({
      where:{id:id},
    });
    if(!billing) throw new NotFoundException(`facturacion con ID (${id}) no encontrada`);

    return billing;
  }

  //Update billing
  async update(id: number, updateBillingDto: UpdateBillingDto) {
    const billing = await this.findOne(id);
    Object.assign(billing, updateBillingDto);
    return this.billingRepository.save(billing);
  }

  //Delete billing
  async remove(id: number) {
    const billing = await this.findOne(id);
    return this.billingRepository.remove(billing);
  }
}