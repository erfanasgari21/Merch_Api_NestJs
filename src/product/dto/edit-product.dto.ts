import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class EditProductDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    basePrice?: number;
}