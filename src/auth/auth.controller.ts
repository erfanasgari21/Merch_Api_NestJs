/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './entity/auth.entity';
import { AuthDto } from './dto';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    @ApiOperation({
        summary: 'Create a new user',
        description: 'This api is used to create a new user and return a JWT token.'
    })
    @ApiCreatedResponse({ description: 'User created successfully' })
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto);
    }

    @Post('login')
    @ApiOperation({
        summary: 'Login a user',
        description: 'This api is used to login a user and return a JWT token.'
    })
    @ApiForbiddenResponse({ description: 'Invalid email or password' })
    login(@Body() dto: AuthDto) {
        return this.authService.login(dto);
    }
}
