import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { SalesRepository } from '../sales/sales.repository';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly salesRepo: SalesRepository) {}

  @Get('sales')
  @ApiOperation({ summary: 'Sales report with filters' })
  async salesReport(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string, @Query('partnerId') partnerId?: string) {
    const params: any = {};
    if (startDate) {
      const d = new Date(startDate);
      if (isNaN(d.getTime())) throw new BadRequestException('Invalid startDate');
      params.startDate = d;
    }
    if (endDate) {
      const d = new Date(endDate);
      if (isNaN(d.getTime())) throw new BadRequestException('Invalid endDate');
      params.endDate = d;
    }
    if (partnerId) params.partnerId = Number(partnerId);

    const sales = await this.salesRepo.findFiltered(params);
    return sales.map((s) => ({ id: s.id, product: s.product, customer: s.customer, partner: s.partner, value: s.value, createdAt: s.createdAt }));
  }
}
