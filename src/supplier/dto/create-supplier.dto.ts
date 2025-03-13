import {IsOptional, IsString, MinLength } from "class-validator";

export class CreateSupplierDto {

    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    address: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @MinLength(11)
    @IsOptional()
    ruc?: string;

    @IsString()
    @IsOptional()
    bank_account?: string;
}