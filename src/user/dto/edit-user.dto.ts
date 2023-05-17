import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class EditUserDto {
    @ApiProperty({ example: 'Leonardo', required: false })
    @IsString()
    @IsOptional()
    firstName?: string;

    @ApiProperty({ example: 'da Vinci', required: false })
    @IsString()
    @IsOptional()
    lastName?: string;
}