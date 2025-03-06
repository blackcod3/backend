import { IsDateString,IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateDetalleOrdenDto {


    @IsNumber()
    @IsPositive()
    id_orden: number;

    @IsNumber()
    @IsPositive()
    cantidad: number;

    @IsString()
    @MinLength(1)
    unidad: string;

    @IsString()
    @MinLength(1)
    descripcion: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    precio_unitario: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    valor_total: number;

}
