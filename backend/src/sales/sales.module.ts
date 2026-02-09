import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { SalesRepository } from './sales.repository';
import { PrismaService } from '../database/prisma.service';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ProductsModule, UsersModule],
  controllers: [SalesController],
  providers: [SalesService, SalesRepository, PrismaService],
  exports: [SalesService]
})
export class SalesModule {}
