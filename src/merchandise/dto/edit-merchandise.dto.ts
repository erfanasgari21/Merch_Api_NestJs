import { IsInt, IsPositive } from "class-validator";

export class EditMerchandiseDto {

    @IsInt()
    @IsPositive()
    profit?: number;
}