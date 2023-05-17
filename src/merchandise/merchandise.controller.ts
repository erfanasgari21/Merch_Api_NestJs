import { Body, Controller, Get, UseGuards, Delete, Post, Param, Query, Patch, } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { MerchandiseService } from './merchandise.service';
import { CreateMerchandiseBulkDto, CreateMerchandiseDto, EditMerchandiseDto, QueryMerchandiseDto } from './dto';
import { GetUser } from '../auth/decorator';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiForbiddenResponse, ApiNotFoundResponse } from '@nestjs/swagger';

const merchandiseNotFoundError = {
    description: 'Merchandise not found',
}
const accessDeniedError = {
    description: 'Access to Merchandise denied',
}

@ApiTags('merchandise')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('merchandises')
export class MerchandiseController {
    constructor(
        private merchandiseService: MerchandiseService
    ) { }


    @Get()
    @ApiOperation({
        summary: 'Get All Merchandises',
        description: 'This api returns all merchandises with pagination, sorting and specified queries'
    })
    async getMerchandises(
        @Query() query: QueryMerchandiseDto
    ) {
        return this.merchandiseService.getMerchandises(query);
    }

    @Get('merchandises/:id')
    @ApiNotFoundResponse(merchandiseNotFoundError)
    @ApiOperation({
        summary: 'Get Merchandise By Id',
        description: 'This api returns a merchandise by id. The Merchandise should not necessarily belong to the user.'
    })
    async getMerchandiseById(
        @Param('id', ParseIntPipe) merchandiseId: number,
    ) {
        return this.merchandiseService.getMerchandiseById(merchandiseId);
    }

    @Post()
    @ApiOperation({
        summary: 'Create a new Merchandise',
        description: 'This api creates a new merchandise which is essentialy relating a design and a product. The design must belong to the user.'
    })
    async createMerchandise(
        @GetUser('id') userId: number,
        @Body() dto: CreateMerchandiseDto
    ) {
        return this.merchandiseService.createMerchandise(userId, dto);
    }

    @Post('bulk')
    @ApiOperation({
        summary: 'Create many Merchandises',
        description: 'This api creates many Merchandises using a design and a list of products as input. The design must belong to the user.'
    })
    async createMerchandiseBulk(
        @GetUser('id') userId: number,
        @Body() dto: CreateMerchandiseBulkDto
    ) {
        return this.merchandiseService.createMerchandiseBulk(userId, dto);
    }

    @Get('/my')
    @ApiOperation({
        summary: 'Get My Merchandises',
        description: 'This api returns all Merchandises belonging to the user.'
    })
    async getMyMerchandises(
        @GetUser('id') userId: number,
    ) {
        return this.merchandiseService.getMyMerchandises(userId);
    }


    @Get('/my/:id')
    @ApiForbiddenResponse(accessDeniedError)
    @ApiNotFoundResponse(merchandiseNotFoundError)
    @ApiOperation({
        summary: 'Get My Merchandise By Id',
        description: 'This api returns a Merchandise by id. The Merchandise must belong to the user.'
    })
    async getMyMerchandiseById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) merchandiseId: number,
    ) {
        return this.merchandiseService.getMyMerchandiseById(userId, merchandiseId);
    }

    @Patch(':id')
    @ApiForbiddenResponse(accessDeniedError)
    @ApiNotFoundResponse(merchandiseNotFoundError)
    @ApiOperation({
        summary: 'Edit Merchandise By Id',
        description: 'This api edits a Merchandise by id. The Merchandise must belong to the user.'
    })
    async editMerchandiseById(
        @GetUser('id') userId: number,
        @Param('id') merchandiseId: number,
        @Body() dto: EditMerchandiseDto
    ) {
        return this.merchandiseService.editMerchandiseById(userId, merchandiseId, dto);
    }

    @Delete(':id')
    @ApiForbiddenResponse(accessDeniedError)
    @ApiNotFoundResponse(merchandiseNotFoundError)
    @ApiOperation({
        summary: 'Delete Merchandise By Id',
        description: 'This api deletes a Merchandise by id. The Merchandise must belong to the user.'
    })
    async deleteMerchandiseById(
        @GetUser('id') userId: number,
        @Param('id') merchandiseId: number,
    ) {
        return this.merchandiseService.deleteMerchandiseById(userId, merchandiseId);
    }

}
