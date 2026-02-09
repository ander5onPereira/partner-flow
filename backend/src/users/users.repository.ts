import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: { name: string; email: string; role: any }) {
    return this.prisma.user.create({ data });
  }

  findAll(skip = 0, take = 10) {
    return this.prisma.user.findMany({ skip, take, orderBy: { id: 'asc' } });
  }

  findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
