import { Injectable, ForbiddenException } from '@nestjs/common';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
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
            // create new user in db
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: hash,
                },
                select: {
                    id: true,
                    email: true,
                }
            });
            // return the saved user token
            return this.signToken(user.id, user.email);

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
            select: {
                id: true,
                email: true,
                hash: true,
            }
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
        return this.signToken(user.id, user.email);
    }

    signToken(userId: number, email: string) {
        const payload = { userId, email };
        const token = this.jwt.sign(payload, {
            expiresIn: '7d',
            secret: process.env.JWT_SECRET,
        })
        return {
            id: userId,
            access_token: token,
        }
    }
}
