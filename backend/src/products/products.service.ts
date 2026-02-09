import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepo: ProductsRepository) {}

  create(dto: CreateProductDto) {
    return this.productsRepo.create({ ...dto });
  }

  findActive(page = 1, perPage = 10) {
    const skip = (page - 1) * perPage;
    return this.productsRepo.findActive(skip, perPage);
  }
}
