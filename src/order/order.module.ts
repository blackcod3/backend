import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import {Order ,OrderType, Supplier, DetailOrder} from 'src/index';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    TypeOrmModule.forFeature([Order, OrderType, Supplier, DetailOrder])
  ]
})
export class OrderModule {}