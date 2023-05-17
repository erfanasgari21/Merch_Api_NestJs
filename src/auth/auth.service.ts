import { Injectable, ForbiddenException } from '@nestjs/common';
import { Auth } from './entity/auth.entity';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as argon from 'argon2';

@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) { }

    async signup(dto: AuthDto) {
        try {
            // generate password hash
            const hash = await argon.hash(dto.password)
            delete dto.password;
            // create new user in db
            const user = await this.prisma.user.create({
                data: {
                    ...dto,
                    hash: hash,
                },
            });
            // return the saved user token
            return this.signToken(user);

        } catch (error) {
            if (error.code === 'P2002') {
                throw new ForbiddenException('Email already exists');
            }
            else
                throw error;
        }

    }

    async login(dto: AuthDto) {
        // find user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            },
        });
        // if user not found throw error
        if (!user) {
            throw new ForbiddenException('Invalid email or password');
        }
        // verify password
        const valid = await argon.verify(user.hash, dto.password);
        // if password is invalid throw error
        if (!valid) {
            throw new ForbiddenException('Invalid email or password');
        }
        // return the user token
        return this.signToken(user);
    }

    signToken(user: User) {
        const payload = { userId: user.id, email: user.email };
        const token = this.jwt.sign(payload, {
            expiresIn: '7d',
            secret: process.env.JWT_SECRET,
        })
        delete user.hash;
        return {
            ...user,
            access_token: token,
        } as Auth
    }
}
