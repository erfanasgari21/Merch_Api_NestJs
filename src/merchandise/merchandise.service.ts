import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMerchandiseBulkDto, CreateMerchandiseDto, EditMerchandiseDto, QueryMerchandiseDto } from './dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

@Injectable()
export class MerchandiseService {
    constructor(
        private prisma: PrismaService
    ) { }

    calculatePrice(merchandise): any {
        const price = merchandise.profit + merchandise.product.basePrice;
        merchandise.price = price;
        delete merchandise.product.basePrice;
        delete merchandise.profit;
        return merchandise;
    }

    async createMerchandise(
        userId: number,
        dto: CreateMerchandiseDto
    ) {
        // find the design
        const design = await this.prisma.design.findUnique({
            where: {
                id: dto.designId
            }
        });
        if (!design)
            throw new NotFoundException('Design not found');

        // check if the design is for the user
        if (design.userId !== userId)
            throw new ForbiddenException('Access to resource denied');

        // create the merchandise
        const merchandise = await this.prisma.merchandise.create({
            data: {
                ...dto,
            }
        });
        return merchandise;
    }


    async createMerchandiseBulk(
        userId: number,
        dto: CreateMerchandiseBulkDto
    ) {
        // find the design
        const design = await this.prisma.design.findUnique({
            where: {
                id: dto.designId
            }
        });
        // check if the design exists
        if (!design)
            throw new NotFoundException('Design not found');

        // check if the design is for the user
        if (design.userId !== userId)
            throw new ForbiddenException('Access to resource denied');

        // create merchandises
        const merchandises = await this.prisma.merchandise.createMany({
            data: dto.products.map(productItem => ({
                ...productItem,
                designId: dto.designId,
            }))
        });
        return merchandises;
    }

    async getMerchandiseById(
        merchandiseId: number,
    ) {
        // get the merchandise by id
        const merchandise = await this.prisma.merchandise.findUnique({
            where: {
                id: merchandiseId
            },
        });
        // check if the merchandise exists
        if (!merchandise)
            throw new NotFoundException('Merchandise not found');
        // calculate and inject the price
        const merchandiseWithPrice = this.calculatePrice(merchandise);
        return merchandiseWithPrice;
    }

    async getMerchandises(
        query: QueryMerchandiseDto
    ) {
        const params = {
            where: {},
            include: { product: true, design: true, },
        };
        if (query.designId)
            params['where']['designId'] = parseInt(query.designId);
        if (query.productId)
            params['where']['productId'] = parseInt(query.productId);
        if (query.userId) {
            params['where']['design'] = {
                userId: parseInt(query.userId)
            }
        }
        if (query.order) {
            params['orderBy'] = {
                'createdAt': query.order
            }
        }
        if (query.limit && query.page) {
            params['take'] = parseInt(query.limit);
            params['skip'] = parseInt(query.limit) * (parseInt(query.page) - 1);
        }
        const merchandises = await this.prisma.merchandise.findMany(params);
        const merchandisesWithPrice = merchandises.map(this.calculatePrice);
        return merchandisesWithPrice;
    }

    async getMyMerchandiseById(
        userId: number,
        merchandiseId: number,
    ) {
        // get the merchandise by id
        const merchandise = await this.prisma.merchandise.findFirst({
            where: {
                id: merchandiseId
            },
            include: {
                design: true,
            }

        });
        // check if the merchandise exists
        if (!merchandise)
            throw new NotFoundException('Merchandise not found');
        // check if the merchandise is for the user
        if (merchandise.design.userId !== userId)
            throw new ForbiddenException('Access to resource denied');

        return merchandise;
    }

    async getMyMerchandises(
        userId: number,
    ) {
        const merchandises = await this.prisma.merchandise.findMany({
            where: {
                design: {
                    userId
                }
            }
        });
        return merchandises;
    }


    async editMerchandiseById(
        userId: number,
        merchandiseId: number,
        dto: EditMerchandiseDto
    ) {
        // get the merchandise by id
        const merchandise = await this.prisma.merchandise.findFirst({
            where: {
                id: merchandiseId
            },
            include: {
                design: true,
            }
        });
        // check if the merchandise exists
        if (!merchandise)
            throw new NotFoundException('Merchandise not found');
        // check if the merchandise is for the user
        if (merchandise.design.userId !== userId)
            throw new ForbiddenException('Access to resource denied');
        // update the merchandise
        const updatedMerchandise = await this.prisma.merchandise.update({
            where: {
                id: merchandiseId
            },
            data: {
                ...dto,
            }
        });
        return updatedMerchandise;
    }

    async deleteMerchandiseById(
        userId: number,
        merchandiseId: number,
    ) {
        // get the merchandise by id
        const merchandise = await this.prisma.merchandise.findFirst({
            where: {
                id: merchandiseId
            },
            include: {
                design: true,
            }
        });
        // check if the merchandise exists
        if (!merchandise)
            throw new NotFoundException('Merchandise not found');
        // check if the merchandise is for the user
        if (merchandise.design.userId !== userId)
            throw new ForbiddenException('Access to resource denied');
        // delete the merchandise
        const deletedMerchandise = await this.prisma.merchandise.delete({
            where: {
                id: merchandiseId
            }
        });
        return deletedMerchandise;
    }

}
