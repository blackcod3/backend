import { Module } from '@nestjs/common';
import { AffectationService } from './affectation.service';
import { AffectationController } from './affectation.controller';
import { Affectation, Order } from 'src/index';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AffectationController],
  providers: [AffectationService],
      imports: [
        TypeOrmModule.forFeature([Affectation, Order])
      ]
})
export class AffectationModule {}
