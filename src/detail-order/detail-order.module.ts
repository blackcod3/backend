import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailOrderService } from './detail-order.service';
import { DetailOrderController } from './detail-order.controller';
import { DetailOrder, Order } from 'src/index';

@Module({
  controllers: [DetailOrderController],
  providers: [DetailOrderService],

  imports: [
    TypeOrmModule.forFeature([DetailOrder, Order])
  ]
})
export class DetailOrderModule {}