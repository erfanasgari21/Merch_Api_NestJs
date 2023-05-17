
import { ApiProperty } from "@nestjs/swagger";

export class Design {
    id: number;
    userId: number;

    @ApiProperty({ example: 'Mona Lisa' })
    title: string;

    @ApiProperty({ example: 'The Mona Lisa is one of the most valuable paintings in the world.' })
    description: string;

    createdAt: Date;
    updatedAt: Date;
}