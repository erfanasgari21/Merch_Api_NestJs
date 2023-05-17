import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class EditDesignDto {
    @ApiProperty({ example: 'Mona Lisa', required: false })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ example: 'The Mona Lisa is one of the most valuable paintings in the world.', required: false })
    @IsString()
    @IsOptional()
    description?: string;
}