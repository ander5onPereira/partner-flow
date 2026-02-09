import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: { name: string; price: number; active?: boolean }) {
    return this.prisma.product.create({ data });
  }

  findActive(skip = 0, take = 10) {
    return this.prisma.product.findMany({ where: { active: true }, skip, take });
  }

  findById(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }
}
