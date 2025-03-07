import { IsDateString, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateOrderDto {
    //FK`S
    @IsNumber()
    @IsPositive()
    id: number;

    @IsNumber()
    @IsPositive()
    id_supplier: number;

    @IsNumber()
    @IsPositive()
    id_order_type: number;

    
    @IsNumber()
    @IsPositive()
    number_order: number;

    @IsDateString()
    date_issued: string;

    @IsString()
    @MinLength(1)
    concept: string;

    @IsString()
    @MinLength(1)
    conditions: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    subtotal: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    igv: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    withholding_taxes: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    net_value: number;
}