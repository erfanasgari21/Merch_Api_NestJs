import { Controller, Delete, Get, Patch, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { GetUser } from '../auth/decorator';
import { ParseIntPipe } from '@nestjs/common';
import { CreateProductDto, EditProductDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiNotFoundResponse, ApiForbiddenResponse } from '@nestjs/swagger';

const productNotFoundError = {
    description: 'Product not found',
}
const accessDeniedError = {
    description: 'Access to Product denied',
}

@ApiTags('product')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('products')
export class ProductController {
    constructor(
        private productService: ProductService
    ) { }

    @Post()
    @ApiOperation({
        summary: 'Create a new Product',
        description: 'This api creates a new Product and returns the new Product.'
    })
    createProduct(
        @GetUser('id') userId: number,
        @Body() dto: CreateProductDto
    ) {
        return this.productService.createProduct(userId, dto);
    }

    @Get()
    @ApiOperation({
        summary: 'Get all Products',
        description: 'This api returns all of the Products of all users.'
    })
    getAllProducts() {
        return this.productService.getAllProducts();
    }

    @Get('my')
    @ApiOperation({
        summary: 'Get my Products',
        description: 'This api returns all of the Products of the current user.'
    })
    getMyProducts(
        @GetUser('id') userId: number
    ) {
        return this.productService.getMyProducts(userId);
    }

    @Get(':id')
    @ApiForbiddenResponse(accessDeniedError)
    @ApiNotFoundResponse(productNotFoundError)
    @ApiOperation({
        summary: 'Get Product by id',
        description: 'This api returns the Product with the given id. Note that the Product must be owned by the current user.'
    })
    getProductById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) productId: number
    ) {
        return this.productService.getProductById(userId, productId);
    }

    @Patch(':id')
    @ApiForbiddenResponse(accessDeniedError)
    @ApiNotFoundResponse(productNotFoundError)
    @ApiOperation({
        summary: 'Edit Product by id',
        description: 'This api edits the Product with the given id and returns the edited Product. Note that the Product must be owned by the current user.'
    })
    editProductById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) productId: number,
        @Body() dto: EditProductDto
    ) {
        return this.productService.editProductById(userId, productId, dto);
    }

    @Delete(':id')
    @ApiForbiddenResponse(accessDeniedError)
    @ApiNotFoundResponse(productNotFoundError)
    @ApiOperation({
        summary: 'Delete Product by id',
        description: 'This api deletes the Product with the given id and returns the deleted Product. Note that the Product must be owned by the current user.'
    })
    deleteProductById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) productId: number,
    ) {
        return this.productService.deleteProductById(userId, productId);
    }
}
