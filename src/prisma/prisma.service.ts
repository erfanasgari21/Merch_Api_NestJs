import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User, Design } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: process.env.DATABASE_URL,
                },
            }
        });
    }

    cleanDB() {
        return this.$transaction([
            this.design.deleteMany(),
            this.product.deleteMany(),
            this.user.deleteMany(),

        ])

    }
}
