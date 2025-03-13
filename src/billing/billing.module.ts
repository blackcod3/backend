import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { Billing, Order } from 'src/index';

@Module({
  controllers: [BillingController],
  providers: [BillingService],
    imports: [
      TypeOrmModule.forFeature([Billing, Order])
    ]
})
export class BillingModule {}
