import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @ApiOperation({ summary: 'Register a sale' })
  @ApiResponse({ status: 201, description: 'Sale registered' })
  create(@Body() dto: CreateSaleDto) {
    return this.salesService.create(dto as any);
  }

  @Get()
  @ApiOperation({ summary: 'List sales with pagination' })
  findAll(@Query('page') page = '1', @Query('perPage') perPage = '10') {
    return this.salesService.findAll(Number(page), Number(perPage));
  }
}
