import {IsString, MinLength } from "class-validator";

export class CreateTipoOrdenDto {

    @IsString()
    @MinLength(1)
    nombre: string;
}
