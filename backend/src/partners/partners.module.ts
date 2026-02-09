import { Module } from '@nestjs/common';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';
import { SalesRepository } from '../sales/sales.repository';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [PartnersController],
  providers: [PartnersService, SalesRepository, PrismaService]
})
export class PartnersModule {}
