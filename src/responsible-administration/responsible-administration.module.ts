import { Module } from '@nestjs/common';
import { ResponsibleAdministrationService } from './responsible-administration.service';
import { ResponsibleAdministrationController } from './responsible-administration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsibleAdministration } from 'src/index';

@Module({
  controllers: [ResponsibleAdministrationController],
  providers: [ResponsibleAdministrationService],
  
  imports: [
    TypeOrmModule.forFeature([ResponsibleAdministration])
  ]
})
export class ResponsibleAdministrationModule {}