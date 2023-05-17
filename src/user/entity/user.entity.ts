
import { ApiProperty } from "@nestjs/swagger";

export class User {
    id: number;

    @ApiProperty({ example: 'Leonardo' })
    firstName: string;
    @ApiProperty({ example: 'da Vinci' })
    lastName: string;

    @ApiProperty({ example: 'leonardo@davinci.com' })
    email: string;

    createdAt: Date;
    updatedAt: Date;
}