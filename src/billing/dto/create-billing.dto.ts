import { IsOptional, IsString, MinLength, IsNumber, IsPositive } from "class-validator";

export class CreateBillingDto {

    @IsNumber()
    @IsPositive()
    order_id: number;

    @IsString()
    @MinLength(1)
    social_reason: string;

    @IsString()
    @MinLength(11)
    ruc: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    address?: string;
}