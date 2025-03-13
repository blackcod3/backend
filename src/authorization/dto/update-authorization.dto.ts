import { IsOptional, IsArray, ArrayNotEmpty, IsInt} from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { Type } from "class-transformer";
import { CreateAuthorizationDto } from './create-authorization.dto';

export class UpdateAuthorizationDto extends PartialType(CreateAuthorizationDto) {}