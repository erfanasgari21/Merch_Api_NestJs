
import { ApiProperty } from "@nestjs/swagger";

export class Auth {
    id: number;

    @ApiProperty({ example: 'Leonardo' })
    firstName: string;
    @ApiProperty({ example: 'da Vinci' })
    lastName: string;

    @ApiProperty({ example: 'leonardo@davinci.com' })
    email: string;

    @ApiProperty({ description: "Api Bearer Token" })
    access_token: string;

    createdAt: Date;
    updatedAt: Date;
}