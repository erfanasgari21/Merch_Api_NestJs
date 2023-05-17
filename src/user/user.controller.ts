import { Controller, Get, UseGuards, Patch, Body } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { EditUserDto } from './dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Type } from 'class-transformer';

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('me')
    @ApiOperation({
        summary: 'Get user profile',
        description: 'This api is used to get user profile information.'
    })
    getMe(@GetUser() user) {
        return user as User;
    }


    @Patch('edit')
    @ApiOperation({
        summary: 'Edit user profile',
        description: 'This api is used to edit user personal information including firstname and lastname.'
    })
    editUser(
        @GetUser('id') userId: number,
        @Body() dto: EditUserDto
    ) {
        return this.userService.editUser(userId, dto);
    }
}

