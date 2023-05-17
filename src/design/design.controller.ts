import { Controller, UseGuards, Body, Post, Get, Delete, Patch, Param } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { DesignService } from './design.service';
import { CreateDesignDto } from './dto/create-design.dto';
import { GetUser } from '../auth/decorator';
import { ParseIntPipe } from '@nestjs/common';
import { EditDesignDto } from './dto';
import { ApiTags, ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation } from '@nestjs/swagger';


const designNotFoundError = {
    description: 'Design not found',
}
const accessDeniedError = {
    description: 'Access to Design denied',
}

@ApiTags('design')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('designs')
export class DesignController {
    constructor(
        private designService: DesignService
    ) { }

    @Post()
    @ApiOperation({
        summary: 'Create a new Design',
        description: 'This api is used to create a new design'
    })
    createDesign(
        @GetUser('id') userId: number,
        @Body() dto: CreateDesignDto
    ) {
        return this.designService.createDesign(userId, dto);
    }

    @Get()
    @ApiOperation({
        summary: 'Get Designs of User',
        description: 'This api is used to get all designs of logged in user.'
    })
    getDesigns(
        @GetUser('id') userId: number
    ) {
        return this.designService.getDesigns(userId);
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get Design by Id',
        description: 'This apis returns a design by its id. note that the design must belong to the logged in user.'
    })
    @ApiForbiddenResponse(accessDeniedError)
    @ApiNotFoundResponse(designNotFoundError)
    getDesignById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) designId: number
    ) {
        return this.designService.getDesignById(userId, designId);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Edit Design by Id',
        description: 'This apis is used to edit a design by its id. note that the design must belong to the logged in user.'
    })
    @ApiForbiddenResponse(accessDeniedError)
    @ApiNotFoundResponse(designNotFoundError)
    editDesignById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) designId: number,
        @Body() dto: EditDesignDto
    ) {
        return this.designService.editDesignById(userId, designId, dto);
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete Design by Id',
        description: 'his apis is used to delete a design by its id. note that the design must belong to the logged in user.'
    })
    @ApiForbiddenResponse(accessDeniedError)
    @ApiNotFoundResponse(designNotFoundError)
    deleteDesignById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) designId: number,
    ) {
        return this.designService.deleteDesignById(userId, designId);
    }
}
