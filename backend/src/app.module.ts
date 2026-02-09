import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { PartnersModule } from './partners/partners.module';
import { ReportsModule } from './reports/reports.module';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, ProductsModule, SalesModule, PartnersModule, ReportsModule],
  providers: [PrismaService]
})
export class AppModule {}
