import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {OrderModule, SupplierModule, DetailOrderModule,CommonModule, 
        BillingModule, AffectationModule, InventoryModule, AuthorizationModule, 
        ResponsibleAdministrationModule, ResponsibleLogisticsModule, ResponsibleSuppliersModule} from 'src/b-module';
import {Order, Supplier, DetailOrder, Billing, Affectation, Inventory, Authorization, 
  ResponsibleAdministration, ResponsibleLogistic, ResponsibleSupplier } from 'src/index';

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
      entities: [Order,Supplier, DetailOrder, Billing, Affectation, 
                Inventory, Authorization, ResponsibleAdministration,
                ResponsibleLogistic, ResponsibleSupplier ],
    }),
    CommonModule,

    OrderModule,

    SupplierModule,

    DetailOrderModule,

    BillingModule,

    AffectationModule,

    InventoryModule,

    AuthorizationModule,

    ResponsibleAdministrationModule,

    ResponsibleLogisticsModule,

    ResponsibleSuppliersModule,
  ],
})
export class AppModule {}