import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailOrderDto } from './create-order-detail.dto';

export class UpdateDetailOrderDto extends PartialType(CreateDetailOrderDto) {}
