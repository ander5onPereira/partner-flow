import { Injectable, BadRequestException } from '@nestjs/common';
import { SalesRepository } from './sales.repository';
import { ProductsRepository } from '../products/products.repository';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class SalesService {
  constructor(
    private readonly salesRepo: SalesRepository,
    private readonly productsRepo: ProductsRepository,
    private readonly usersRepo: UsersRepository
  ) {}

  async create(dto: { productId: number; customerId: number; partnerId: number }) {
    const product = await this.productsRepo.findById(dto.productId);
    if (!product) throw new BadRequestException('Product not found');
    const customer = await this.usersRepo.findById(dto.customerId);
    if (!customer || customer.role !== 'CUSTOMER') throw new BadRequestException('Customer not found or not CUSTOMER');
    const partner = await this.usersRepo.findById(dto.partnerId);
    if (!partner || partner.role !== 'PARTNER') throw new BadRequestException('Partner not found or not PARTNER');

    const sale = await this.salesRepo.create({ productId: product.id, customerId: customer.id, partnerId: partner.id, value: product.price });
    return sale;
  }

  findAll(page = 1, perPage = 10) {
    const skip = (page - 1) * perPage;
    return this.salesRepo.findAll(skip, perPage);
  }
}
