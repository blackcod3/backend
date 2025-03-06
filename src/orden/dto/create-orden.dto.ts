import { IsDateString, IsNumber, IsPositive, IsString, MinLength } from "class-validator";


export class CreateOrdenDto {
    //FK`S
    @IsNumber()
    @IsPositive()
    id_tipo_orden: number;

    @IsNumber()
    @IsPositive()
    id_proveedor: number;

    @IsNumber()
    @IsPositive()
    id_detalle_orden: number;

    
    @IsNumber()
    @IsPositive()
    number_order: number;

    @IsDateString()
    fecha_emision: string;

    @IsString()
    @MinLength(1)
    concepto: string;

    @IsString()
    @MinLength(1)
    condiciones: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    subtotal: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    igv: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    retencion_impuesto: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    valor_neto: number;

}
