import { Module } from '@nestjs/common';
import { ResponsibleSuppliersService } from './responsible-suppliers.service';
import { ResponsibleSuppliersController } from './responsible-suppliers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsibleSupplier } from 'src/index';

@Module({
  controllers: [ResponsibleSuppliersController],
  providers: [ResponsibleSuppliersService],
  imports: [
    TypeOrmModule.forFeature([ResponsibleSupplier])
  ]
})
export class ResponsibleSuppliersModule {}
