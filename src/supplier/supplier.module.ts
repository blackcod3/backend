import { Module } from '@nestjs/common';
import { SupplierService} from './supplier.service';
import { SupplierController } from './supplier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from 'src/index';

@Module({
  controllers: [SupplierController],
  providers: [SupplierService],

  imports: [
    TypeOrmModule.forFeature([Supplier])
  ]
})
export class SupplierModule {}