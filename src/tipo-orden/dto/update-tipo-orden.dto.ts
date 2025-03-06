import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoOrdenDto } from './create-tipo-orden.dto';

export class UpdateTipoOrdenDto extends PartialType(CreateTipoOrdenDto) {}
