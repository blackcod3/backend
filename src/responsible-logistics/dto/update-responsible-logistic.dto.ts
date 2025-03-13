import { PartialType } from '@nestjs/mapped-types';
import { CreateResponsibleLogisticDto } from './create-responsible-logistic.dto';

export class UpdateResponsibleLogisticDto extends PartialType(CreateResponsibleLogisticDto) {}
