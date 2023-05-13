import { IsOptional, IsString, IsUrl } from "class-validator";

export class EditDesignDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;
}