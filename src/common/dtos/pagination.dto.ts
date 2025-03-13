import { Type } from "class-transformer";
import { IsOptional, IsInt, Min } from "class-validator";

export class PaginationDto{

    @IsOptional()
    @Type(() => Number)
    @IsInt() 
    @Min(1)
    page?: number=1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number=10;
}