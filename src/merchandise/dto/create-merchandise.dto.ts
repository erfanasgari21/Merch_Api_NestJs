import { IsInt, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateMerchandiseDto {
    @IsInt()
    @IsNotEmpty()
    designId: number;

    @IsInt()
    @IsNotEmpty()
    productId: number;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    profit: number;
}