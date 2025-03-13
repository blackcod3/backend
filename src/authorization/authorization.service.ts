import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateAuthorizationDto } from './dto/create-authorization.dto';
import { UpdateAuthorizationDto } from './dto/update-authorization.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Authorization, Order, ResponsibleAdministration, ResponsibleLogistic, ResponsibleSupplier} from 'src/index';

@Injectable()
export class AuthorizationService {

  constructor(
    @InjectRepository(Authorization)
    private readonly authorizationRepository: Repository<Authorization>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(ResponsibleAdministration)
    private readonly adminRepository: Repository<ResponsibleAdministration>,

    @InjectRepository(ResponsibleLogistic)
    private readonly logisticsRepository: Repository<ResponsibleLogistic>,

    @InjectRepository(ResponsibleSupplier)
    private readonly supplierRepository: Repository<ResponsibleSupplier>,
  ) {}

  //Create Authorization
  async create(createAuthorizationDto: CreateAuthorizationDto): Promise<Authorization>{
    const { orders_id, administration_id, logistics_id, suppliers_id, completion_date } = createAuthorizationDto;

    const orders = await this.orderRepository.find({where: { id: In(orders_id) }})
    if (orders.length !== orders_id.length) throw new NotFoundException('No se encontraron ordenes');

    const administration = await this.adminRepository.findOne({ where: { id: administration_id } });
    if (!administration) throw new NotFoundException(`Responsable administrativo no encontrado`);

    const logistics = await this.logisticsRepository.findOne({ where: { id: logistics_id } });
    if (!logistics) throw new NotFoundException(`Responsable logistica no encontrado`);

    const suppliers = await this.supplierRepository.findOne({ where: { id: suppliers_id } });
    if (!suppliers) throw new NotFoundException(`Responsable proveedor no encontrado`);

    const authorization = this.authorizationRepository.create({
      orders,
      administration,
      logistics,
      suppliers,
      completion_date,
    });

    return await this.authorizationRepository.save(authorization);
  }

  //Find all
  async findAll({ page = 1, limit = 10 }: PaginationDto) {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    const [data, total] = await this.authorizationRepository.findAndCount({
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
      relations: ['administration', 'logistics', 'suppliers']
    });

    return {
      data,
      total,
      page: pageNumber,
      lastPage: Math.ceil(total / limitNumber),
      
    };
  }

  //Fin by ID
  async findOne(id: number) {
    const authorization = await this.authorizationRepository.findOne({
      where: { id },
      relations: ['administration', 'logistics', 'suppliers']
    });

    if (!authorization)throw new NotFoundException(`Autorizacion con ID(${id}) no encontrado`);

    return authorization;
  }

  //Update Authorization
  async update(id: number, updateAuthorizationDto: UpdateAuthorizationDto) {
    const authorization = await this.authorizationRepository.findOne({ 
      where: { id },
      relations: ['orders', 'administration', 'logistics', 'supplier'],
    });
    if (!authorization)throw new NotFoundException(`Authorization con ID(${id}) no encontrado`);

    if (updateAuthorizationDto.orders_id){
      const orders = await this.orderRepository.find({
        where: { id: In(updateAuthorizationDto.orders_id) },
      });
      if (orders.length !== updateAuthorizationDto.orders_id.length) throw new NotFoundException(`Algunas órdenes no fueron encontradas!`); 
      
      authorization.orders = orders;
    }
    
    if (updateAuthorizationDto.administration_id){
      const administration = await this.adminRepository.findOne({
        where: { id: updateAuthorizationDto.administration_id },
      });
      if(!administration)throw new NotFoundException(`Administrador con ID(${updateAuthorizationDto.administration_id}) no encontrado!`);
    
      authorization.administration = administration;
    }

    if (updateAuthorizationDto.logistics_id){
      const logistics = await this.logisticsRepository.findOne({
        where: { id: updateAuthorizationDto.logistics_id },
      });
      if(!logistics)throw new NotFoundException(`Logística con ID(${updateAuthorizationDto.logistics_id}) no encontrado`);
    
      authorization.logistics = logistics;
    }

    if (updateAuthorizationDto.suppliers_id) {
      const suppliers = await this.supplierRepository.findOne({
        where: { id: updateAuthorizationDto.suppliers_id },
      });
      if (!suppliers)throw new NotFoundException(`Proveedor con ID(${updateAuthorizationDto.suppliers_id}) no encontrado`);
    
      authorization.suppliers = suppliers;
    }
    
    //Assign the updated values
    Object.assign(authorization, updateAuthorizationDto);

    return this.authorizationRepository.save(authorization);
  }

  //Delete Authorization
  async remove(id: number) {
    const authorization = await this.findOne(id);
    await this.authorizationRepository.remove(authorization);
  }
}