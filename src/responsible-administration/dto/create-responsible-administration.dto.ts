import { IsNotEmpty, IsString } from 'class-validator';

export class CreateResponsibleAdministrationDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    signature: string;
}