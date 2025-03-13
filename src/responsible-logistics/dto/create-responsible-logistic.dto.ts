import { IsNotEmpty, IsString } from 'class-validator';

export class CreateResponsibleLogisticDto {

        @IsNotEmpty()
        @IsString()
        name: string;
        
        @IsNotEmpty()
        @IsString()
        signature: string;
}