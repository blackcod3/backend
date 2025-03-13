import { IsNumber, IsPositive, IsDateString, IsArray } from "class-validator";

export class CreateAuthorizationDto {

    @IsArray()
    @IsNumber({}, { each: true }) 
    orders_id: number[];
    
    @IsNumber()
    @IsPositive()
    administration_id: number;

    @IsNumber()
    @IsPositive()
    logistics_id: number;

    @IsNumber()
    @IsPositive()
    suppliers_id: number;

    @IsDateString()
    completion_date: string;
}