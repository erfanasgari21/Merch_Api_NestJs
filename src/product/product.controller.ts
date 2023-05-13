import { Controller, Delete, Get, Patch, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { GetUser } from '../auth/decorator';
import { ParseIntPipe } from '@nestjs/common';
import { CreateProductDto, EditProductDto } from './dto';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('products')
export class ProductController {
    constructor(
        private productService: ProductService
    ) { }

    @Post()
    createProduct(
        @GetUser('id') userId: number,
        @Body() dto: CreateProductDto
    ) {
        return this.productService.createProduct(userId, dto);
    }

    @Get()
    getAllProducts() {
        return this.productService.getAllProducts();
    }

    @Get('my')
    getMyProducts(
        @GetUser('id') userId: number
    ) {
        return this.productService.getMyProducts(userId);
    }

    @Get(':id')
    getProductById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) productId: number
    ) {
        return this.productService.getProductById(userId, productId);
    }

    @Patch(':id')
    editProductById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) productId: number,
        @Body() dto: EditProductDto
    ) {
        return this.productService.editProductById(userId, productId, dto);
    }

    @Delete(':id')
    deleteProductById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) productId: number,
    ) {
        return this.productService.deleteProductById(userId, productId);
    }
}
