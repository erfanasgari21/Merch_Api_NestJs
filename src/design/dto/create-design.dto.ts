import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateDesignDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;
}