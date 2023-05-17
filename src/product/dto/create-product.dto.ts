import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ example: 'Tshirt' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: '100% Cotton', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: 100000 })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    basePrice: number;
}