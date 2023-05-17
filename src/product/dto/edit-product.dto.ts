import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EditProductDto {
    @ApiProperty({ example: 'Tshirt', required: false })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ example: '100% Cotton', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: 100000, required: false })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    basePrice?: number;
}