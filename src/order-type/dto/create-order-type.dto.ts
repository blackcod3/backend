import {IsString, MinLength } from "class-validator";

export class CreateOrderTypeDto {

    @IsString()
    @MinLength(1)
    name: string;
}