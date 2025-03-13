import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory} from 'src/index';

@Module({
  controllers: [InventoryController],
  providers: [InventoryService],
  imports: [
    TypeOrmModule.forFeature([Inventory])
  ]
})
export class InventoryModule {}