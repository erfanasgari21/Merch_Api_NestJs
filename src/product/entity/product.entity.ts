
import { ApiProperty } from "@nestjs/swagger";

export class Product {
    id: number;
    userId: number;

    @ApiProperty({ example: 'Tshirt' })
    title: string;
    @ApiProperty({ example: '100% Cotton' })
    description: string;

    @ApiProperty({ example: 100000 })
    basePrice: number;

    createdAt: Date;
    updatedAt: Date;
}