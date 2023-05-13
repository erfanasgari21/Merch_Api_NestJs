import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateDesignDto, EditDesignDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DesignService {
    constructor(private prisma: PrismaService) { }

    async createDesign(
        userId: number,
        dto: CreateDesignDto
    ) {
        const design = await this.prisma.design.create({
            data: {
                userId,
                ...dto,
            }
        });
        return design
    }


    async getDesigns(
        userId: number
    ) {
        const designs = await this.prisma.design.findMany({
            where: {
                userId
            }
        });
        return designs;
    }


    async getDesignById(
        userId: number,
        designId: number,
    ) {
        const design = await this.prisma.design.findFirst({
            where: {
                userId,
                id: designId
            }
        });
        return design;
    }


    async editDesignById(
        userId: number,
        designId: number,
        dto: EditDesignDto
    ) {
        const design = await this.prisma.design.findUnique({
            where: {
                id: designId
            }
        })
        if (!design || design.userId !== userId) {
            throw new ForbiddenException('Access to resource denied')
        }
        const updatedDesign = await this.prisma.design.update({
            where: {
                id: designId
            },
            data: dto
        });
        return updatedDesign;
    }


    async deleteDesignById(
        userId: number,
        designId: number,
    ) {
        const design = await this.prisma.design.findUnique({
            where: {
                id: designId
            }
        })
        if (!design || design.userId !== userId) {
            throw new ForbiddenException('Access to resource denied')
        }
        const deletedDesign = await this.prisma.design.delete({
            where: {
                id: designId
            }
        });
        return deletedDesign;
    }
}
