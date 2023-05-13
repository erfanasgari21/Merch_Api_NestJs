import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, EditProductDto } from './dto';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) { }

    async createProduct(
        userId: number,
        dto: CreateProductDto
    ) {
        const product = await this.prisma.product.create({
            data: {
                userId,
                ...dto,
            }
        });
        return product
    }

    async getAllProducts() {
        const products = await this.prisma.product.findMany({});
        return products;
    }

    async getMyProducts(
        userId: number
    ) {
        const products = await this.prisma.product.findMany({
            where: {
                userId
            }
        });
        return products;
    }

    async getProductById(
        userId: number,
        productId: number,
    ) {
        const product = await this.prisma.product.findFirst({
            where: {
                userId,
                id: productId
            }
        });
        return product;
    }

    async editProductById(
        userId: number,
        productId: number,
        dto: EditProductDto
    ) {
        const product = await this.prisma.product.findUnique({
            where: {
                id: productId
            }
        })
        if (!product || product.userId !== userId) {
            throw new ForbiddenException('Access to resource denied')
        }
        const updatedProduct = await this.prisma.product.update({
            where: {
                id: productId
            },
            data: {
                ...dto
            }
        })
        return updatedProduct;
    }

    async deleteProductById(
        userId: number,
        productId: number,
    ) {
        const product = await this.prisma.product.findUnique({
            where: {
                id: productId
            }
        })
        if (!product || product.userId !== userId) {
            throw new ForbiddenException('Access to resource denied')
        }
        const deletedProduct = await this.prisma.product.delete({
            where: {
                id: productId
            }
        })
        return deletedProduct;
    }

}
