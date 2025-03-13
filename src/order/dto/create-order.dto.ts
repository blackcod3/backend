import { IsEnum ,IsDateString, IsNumber, IsPositive, IsString, MinLength, IsOptional, IsArray } from "class-validator";
import { OrderType } from "../entities/order.entity";
export class CreateOrderDto {

    @IsNumber()
    @IsPositive()
    supplier_id: number;

    @IsArray()
    @IsNumber({}, { each: true }) 
    authorization_ids: number[];

    @IsEnum(OrderType, { message: "El tipo de orden debe ser 'compra' o 'servicio'" })
    order_type:OrderType;

    @IsString()
    @MinLength(1)
    order_number: string;

    @IsDateString()
    date_issued: string;

    @IsString()
    @MinLength(1)
    concept: string;

    @IsString()
    @MinLength(1)
    contract_number: string;

    @IsString()
    @MinLength(1)
    coin: string

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    subtotal: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    igv: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    total:number

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    withholding_taxes: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    net_value: number;

    @IsString()
    @IsOptional()
    warehouse?: string;

    @IsString()
    @MinLength(1)
    conditions: string;

    @IsString()
    @IsOptional()
    workplace?: string;

    @IsString()
    @IsOptional()
    deadline?: string;

    @IsString()
    @IsOptional()
    payment?: string;
}