import {IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateDetailOrderDto {

    @IsNumber()
    @IsPositive()
    order_id: number;

    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsString()
    @MinLength(1)
    unit: string;

    @IsString()
    @MinLength(1)
    description: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    unit_price: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    total_value: number;
}