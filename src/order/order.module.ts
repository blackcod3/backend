import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import {Order ,Supplier, DetailOrder, Billing, Affectation, Authorization} from 'src/index';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    TypeOrmModule.forFeature([Order,Supplier, DetailOrder, Billing, Affectation, Authorization])
  ]
})
export class OrderModule {}