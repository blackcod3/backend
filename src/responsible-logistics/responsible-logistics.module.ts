import { Module } from '@nestjs/common';
import { ResponsibleLogisticsService } from './responsible-logistics.service';
import { ResponsibleLogisticsController } from './responsible-logistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsibleLogistic } from 'src/index';

@Module({
  controllers: [ResponsibleLogisticsController],
  providers: [ResponsibleLogisticsService],
  imports: [
    TypeOrmModule.forFeature([ResponsibleLogistic])
  ]
})
export class ResponsibleLogisticsModule {}
