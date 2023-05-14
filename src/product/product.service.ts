import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, EditProductDto } from './dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

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
        // find the product
        const product = await this.prisma.product.findUnique({
            where: {
                id: productId
            }
        });
        // check if the product exists
        if (!product)
            throw new NotFoundException('Product not found');
        // check if the product is for the user
        if (product.userId !== userId)
            throw new ForbiddenException('Access to product denied');
        return product;
    }

    async editProductById(
        userId: number,
        productId: number,
        dto: EditProductDto
    ) {
        // find the product
        const product = await this.prisma.product.findUnique({
            where: {
                id: productId
            }
        })
        // check if the product exists
        if (!product)
            throw new NotFoundException('Product not found');
        // check if the product is for the user
        if (product.userId !== userId)
            throw new ForbiddenException('Access to product denied');
        // update the product
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
        // find the product
        const product = await this.prisma.product.findUnique({
            where: {
                id: productId
            }
        })
        // check if the product exists
        if (!product)
            throw new NotFoundException('Product not found');
        // check if the product is for the user
        if (product.userId !== userId)
            throw new ForbiddenException('Access to product denied');
        // delete the product
        const deletedProduct = await this.prisma.product.delete({
            where: {
                id: productId
            }
        })
        return deletedProduct;
    }

}
