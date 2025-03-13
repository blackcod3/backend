import { PartialType } from '@nestjs/mapped-types';
import { CreateResponsibleSupplierDto } from './create-responsible-supplier.dto';

export class UpdateResponsibleSupplierDto extends PartialType(CreateResponsibleSupplierDto) {}
