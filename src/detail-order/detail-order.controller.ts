import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailOrderService  } from './detail-order.service';
import { CreateDetailOrderDto } from './dto/create-order-detail.dto';
import { UpdateDetailOrderDto } from './dto/update-order-detail.dto';

@Controller('detalle-orden')
export class DetailOrderController {
  constructor(private readonly detailOrderService: DetailOrderService ) {}

  @Post()
  create(@Body() createDetailOrderDto: CreateDetailOrderDto) {
    return this.detailOrderService.create(createDetailOrderDto);
  }

  @Get()
  findAll() {
    return this.detailOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetailOrderDto: UpdateDetailOrderDto) {
    return this.detailOrderService.update(+id, updateDetailOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailOrderService.remove(+id);
  }
}