import { Injectable } from '@nestjs/common';
import { EditUserDto } from './dto';
import { User } from './entity/user.entity'
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }
    async editUser(
        userId: number,
        dto: EditUserDto
    ) {
        const user = await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...dto
            },
        });
        delete user.hash
        return user as User;
    }
}
