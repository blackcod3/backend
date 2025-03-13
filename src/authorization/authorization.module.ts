import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authorization, Order, ResponsibleAdministration, ResponsibleLogistic, ResponsibleSupplier } from 'src/index';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
  imports: [
    TypeOrmModule.forFeature([Authorization, Order, ResponsibleAdministration, ResponsibleLogistic, ResponsibleSupplier])
  ]
})
export class AuthorizationModule {}