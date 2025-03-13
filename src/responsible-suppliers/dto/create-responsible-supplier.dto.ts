import { IsNotEmpty, IsString } from 'class-validator';

export class CreateResponsibleSupplierDto {

            @IsNotEmpty()
            @IsString()
            name: string;
        
            @IsNotEmpty()
            @IsString()
            signature: string;
}