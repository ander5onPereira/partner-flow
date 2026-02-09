import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class SalesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: { productId: number; customerId: number; partnerId: number; value: number }) {
    return this.prisma.sale.create({ data });
  }

  findAll(skip = 0, take = 10) {
    return this.prisma.sale.findMany({ skip, take, orderBy: { id: 'desc' }, include: { product: true, customer: true, partner: true } });
  }

  findByPartner(partnerId: number) {
    return this.prisma.sale.findMany({ where: { partnerId } });
  }

  findFiltered(params: { startDate?: Date; endDate?: Date; partnerId?: number }) {
    const where: any = {};
    if (params.partnerId) where.partnerId = params.partnerId;
    if (params.startDate || params.endDate) {
      where.createdAt = {} as any;
      if (params.startDate) where.createdAt.gte = params.startDate;
      if (params.endDate) where.createdAt.lte = params.endDate;
    }
    return this.prisma.sale.findMany({ where, include: { product: true, customer: true, partner: true } });
  }
}
