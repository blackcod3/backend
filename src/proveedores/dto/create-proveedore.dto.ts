import {IsOptional, IsString, MinLength } from "class-validator";


export class CreateProveedoreDto {

    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(1)
    direccion: string;

    @IsString()
    @IsOptional()
    telefono?: string;

    @IsString()
    @MinLength(11)
    ruc: string;

    @IsString()
    @MinLength(1)
    cuenta_bancaria: string;
}
