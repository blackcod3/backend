import { Min, IsString, MinLength, IsNumber, IsPositive, IsInt } from "class-validator";

export class CreateAffectationDto {

    @IsNumber()
    @IsPositive()
    order_id: number;

    @IsString()
    @MinLength(1)
    meta_nemonico: string;

    @IsInt()
    @Min(1) 
    accounting_code: number;

    @IsString()
    @MinLength(1)
    denomination: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    amount: number;
}
