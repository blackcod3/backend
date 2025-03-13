import { PartialType } from '@nestjs/mapped-types';
import { CreateResponsibleAdministrationDto } from './create-responsible-administration.dto';

export class UpdateResponsibleAdministrationDto extends PartialType(CreateResponsibleAdministrationDto) {}
