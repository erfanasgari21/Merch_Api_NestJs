import { Controller, UseGuards, Body, Post, Get, Delete, Patch, Param } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { DesignService } from './design.service';
import { CreateDesignDto } from './dto/create-design.dto';
import { GetUser } from '../auth/decorator';
import { ParseIntPipe } from '@nestjs/common';
import { EditDesignDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('design')
@UseGuards(JwtGuard)
@Controller('designs')
export class DesignController {
    constructor(
        private designService: DesignService
    ) { }

    @Post()
    createDesign(
        @GetUser('id') userId: number,
        @Body() dto: CreateDesignDto
    ) {
        return this.designService.createDesign(userId, dto);
    }

    @Get()
    getDesigns(
        @GetUser('id') userId: number
    ) {
        return this.designService.getDesigns(userId);
    }

    @Get(':id')
    getDesignById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) designId: number
    ) {
        return this.designService.getDesignById(userId, designId);
    }

    @Patch(':id')
    editDesignById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) designId: number,
        @Body() dto: EditDesignDto
    ) {
        return this.designService.editDesignById(userId, designId, dto);
    }

    @Delete(':id')
    deleteDesignById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) designId: number,
    ) {
        return this.designService.deleteDesignById(userId, designId);
    }
}
