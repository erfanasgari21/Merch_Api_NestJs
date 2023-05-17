import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';


export class AuthDto {
    @ApiProperty({ example: 'leonardo@davinci.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ example: 'Leonardo', required: false })
    @IsOptional()
    @IsString()
    firstName?: string;

    @ApiProperty({ example: 'da Vinci', required: false })
    @IsOptional()
    @IsString()
    lastName?: string;
}