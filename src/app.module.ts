import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdenModule } from './orden/orden.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { DetalleOrdenModule } from './detalle-orden/detalle-orden.module';
import { TipoOrdenModule } from './tipo-orden/tipo-orden.module';

import { TipoOrden } from "src/tipo-orden/entities/tipo-orden.entity";
import { Orden } from 'src/orden/entities/orden.entity';
import { Proveedor } from './proveedores/entities/proveedores.entity';
import { DetalleOrden } from './detalle-orden/entities/detalle-orden.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 5432),
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true, //carga las entidades de forma automática
      synchronize: true, //sincroniza los cambios que se realice en el código con la base de datos
      entities: [Orden, TipoOrden, Proveedor, DetalleOrden],
    }),

    OrdenModule,

    ProveedoresModule,

    TipoOrdenModule,

    DetalleOrdenModule,
  ],

})
export class AppModule {}
