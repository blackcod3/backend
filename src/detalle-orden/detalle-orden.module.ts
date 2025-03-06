import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DetalleOrdenService } from './detalle-orden.service';
import { DetalleOrdenController } from './detalle-orden.controller';

import { DetalleOrden } from './entities/detalle-orden.entity';
import { Orden } from 'src/orden/entities/orden.entity';

@Module({
  controllers: [DetalleOrdenController],
  providers: [DetalleOrdenService],

  imports: [
    TypeOrmModule.forFeature([DetalleOrden, Orden])
  ]
})
export class DetalleOrdenModule {}
