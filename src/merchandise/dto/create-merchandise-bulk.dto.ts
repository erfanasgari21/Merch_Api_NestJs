import { IsInt, IsNotEmpty, IsPositive } from "class-validator";
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductItem {
    @IsInt()
    @IsNotEmpty()
    productId: number;

    @IsInt()
    @IsNotEmpty()
    @IsPositive()
    profit: number;
}

export class CreateMerchandiseBulkDto {
    @IsInt()
    @IsNotEmpty()
    designId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductItem)
    products: ProductItem[]
}


