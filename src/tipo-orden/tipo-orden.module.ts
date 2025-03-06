import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TipoOrdenService } from './tipo-orden.service';
import { TipoOrdenController } from './tipo-orden.controller';

import { TipoOrden } from './entities/tipo-orden.entity';

@Module({
  controllers: [TipoOrdenController],
  providers: [TipoOrdenService],
    imports: [
      TypeOrmModule.forFeature([TipoOrden])
    ]
})
export class TipoOrdenModule {}
