import { Body, Controller, Get, UseGuards, Delete, Post, Param, Query, Patch, } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { MerchandiseService } from './merchandise.service';
import { CreateMerchandiseBulkDto, CreateMerchandiseDto, EditMerchandiseDto, QueryMerchandiseDto } from './dto';
import { GetUser } from '../auth/decorator';
import { ParseIntPipe } from '@nestjs/common/pipes';

@UseGuards(JwtGuard)
@Controller('merchandises')
export class MerchandiseController {
    constructor(
        private merchandiseService: MerchandiseService
    ) { }

    @Get()
    async getMerchandises(
        @Query() query: QueryMerchandiseDto
    ) {
        return this.merchandiseService.getMerchandises(query);
    }

    @Get('/merchandises/:id')
    async getMerchandiseById(
        @Param('id', ParseIntPipe) merchandiseId: number,
    ) {
        return this.merchandiseService.getMerchandiseById(merchandiseId);
    }

    @Post()
    async createMerchandise(
        @GetUser('id') userId: number,
        @Body() dto: CreateMerchandiseDto
    ) {
        return this.merchandiseService.createMerchandise(userId, dto);
    }

    @Post('bulk')
    async createMerchandiseBulk(
        @GetUser('id') userId: number,
        @Body() dto: CreateMerchandiseBulkDto
    ) {
        return this.merchandiseService.createMerchandiseBulk(userId, dto);
    }

    @Get('/my')
    async getMyMerchandises(
        @GetUser('id') userId: number,
    ) {
        return this.merchandiseService.getMyMerchandises(userId);
    }


    @Get('/my/:id')
    async getMyMerchandiseById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) merchandiseId: number,
    ) {
        return this.merchandiseService.getMyMerchandiseById(userId, merchandiseId);
    }

    @Patch(':id')
    async editMerchandiseById(
        @GetUser('id') userId: number,
        @Param('id') merchandiseId: number,
        @Body() dto: EditMerchandiseDto
    ) {
        return this.merchandiseService.editMerchandiseById(userId, merchandiseId, dto);
    }

    @Delete(':id')
    async deleteMerchandiseById(
        @GetUser('id') userId: number,
        @Param('id') merchandiseId: number,
    ) {
        return this.merchandiseService.deleteMerchandiseById(userId, merchandiseId);
    }

}
