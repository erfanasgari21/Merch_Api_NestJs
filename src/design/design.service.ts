import { ForbiddenException, NotFoundException, Injectable } from '@nestjs/common';
import { CreateDesignDto, EditDesignDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Design } from './entity/design.entity'

@Injectable()
export class DesignService {
    constructor(private prisma: PrismaService) { }

    async createDesign(
        userId: number,
        dto: CreateDesignDto
    ) {
        const design: Design = await this.prisma.design.create({
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
        const designs: Design[] = await this.prisma.design.findMany({
            where: {
                userId
            },

        });
        return designs;
    }


    async getDesignById(
        userId: number,
        designId: number,
    ) {
        // find the design
        const design: Design = await this.prisma.design.findUnique({
            where: {
                id: designId
            }
        });
        // check if the design exists
        if (!design)
            throw new NotFoundException('Design not found');
        // check if the design is for the user
        if (design.userId !== userId)
            throw new ForbiddenException('Access to resource denied');

        return design;
    }


    async editDesignById(
        userId: number,
        designId: number,
        dto: EditDesignDto
    ) {
        // find the design
        const design = await this.prisma.design.findUnique({
            where: {
                id: designId
            }
        })
        // check if the design exists
        if (!design)
            throw new NotFoundException('Design not found');
        // check if the design is for the user
        if (design.userId !== userId)
            throw new ForbiddenException('Access to resource denied');
        // update the design
        const updatedDesign: Design = await this.prisma.design.update({
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
        // find the design
        const design = await this.prisma.design.findUnique({
            where: {
                id: designId
            }
        })
        // check if the design exists
        if (!design)
            throw new NotFoundException('Design not found');
        // check if the design is for the user
        if (design.userId !== userId)
            throw new ForbiddenException('Access to resource denied');
        // delete the design
        const deletedDesign: Design = await this.prisma.design.delete({
            where: {
                id: designId
            }
        });
        return deletedDesign;
    }
}
