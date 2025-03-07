import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTypeService } from './order-type.service';
import { OrderTypeController } from './order-type.controller';
import { OrderType } from 'src/index';

@Module({
  controllers: [OrderTypeController],
  providers: [OrderTypeService],
    imports: [
      TypeOrmModule.forFeature([OrderType])
    ]
})
export class OrderTypeModule {}