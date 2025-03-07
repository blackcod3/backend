import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {OrderModule, SupplierModule, DetailOrderModule, OrderTypeModule } from 'src/b-module';
import {OrderType, Order, Supplier, DetailOrder} from 'src/index'
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
      autoLoadEntities: true, 
      synchronize: true, 
      entities: [Order, OrderType, Supplier, DetailOrder],
    }),

    OrderModule,

    SupplierModule,

    OrderTypeModule,

    DetailOrderModule,
  ],

})
export class AppModule {}