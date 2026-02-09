import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { SalesRepository } from '../sales/sales.repository';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [ReportsController],
  providers: [SalesRepository, PrismaService]
})
export class ReportsModule {}
