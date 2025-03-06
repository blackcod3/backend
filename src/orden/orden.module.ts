import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdenService } from './orden.service';

import { OrdenController } from './orden.controller';

import { Orden } from './entities/orden.entity';
import { TipoOrden } from 'src/tipo-orden/entities/tipo-orden.entity';
import { Proveedor } from 'src/proveedores/entities/proveedores.entity';
import { DetalleOrden } from 'src/detalle-orden/entities/detalle-orden.entity';

@Module({
  controllers: [OrdenController],
  providers: [OrdenService],
  imports: [
    TypeOrmModule.forFeature([Orden, TipoOrden, Proveedor, DetalleOrden])
  ]
})
export class OrdenModule {}