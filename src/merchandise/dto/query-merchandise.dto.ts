
import { IsInt, IsNumber, IsNumberString, IsOptional, IsPositive, IsString } from 'class-validator';

export class QueryMerchandiseDto {
    @IsNumberString()
    @IsOptional()
    userId?: string;

    @IsNumberString()
    @IsOptional()
    productId?: string;

    @IsNumberString()
    @IsOptional()
    designId?: string;

    @IsString()
    @IsOptional()
    order?: 'asc' | 'desc';

    @IsNumberString()
    @IsOptional()
    limit?: string;

    @IsNumberString()
    @IsOptional()
    page?: string;
}