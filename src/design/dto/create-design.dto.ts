import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDesignDto {
    @ApiProperty({ example: 'Mona Lisa' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'The Mona Lisa is one of the most valuable paintings in the world.', required: false })
    @IsString()
    @IsOptional()
    description?: string;
}