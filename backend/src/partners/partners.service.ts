import { Injectable, NotFoundException } from '@nestjs/common';
import { SalesRepository } from '../sales/sales.repository';

@Injectable()
export class PartnersService {
  constructor(private readonly salesRepo: SalesRepository) {}

  async getCommissions(partnerId: number) {
    const sales = await this.salesRepo.findByPartner(partnerId);
    if (!sales) throw new NotFoundException('Partner not found or no sales');
    const totalSales = sales.length;
    const totalValue = sales.reduce((s, cur) => s + cur.value, 0);
    const totalCommission = Number((totalValue * 0.1).toFixed(2));
    return { partnerId, totalSales, totalCommission };
  }
}
