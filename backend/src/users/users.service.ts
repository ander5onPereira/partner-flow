import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async create(dto: CreateUserDto) {
    const exists = await this.usersRepo.findByEmail(dto.email);
    if (exists) throw new BadRequestException('Email already in use');
    return this.usersRepo.create(dto as any);
  }

  findAll(page = 1, perPage = 10) {
    const skip = (page - 1) * perPage;
    return this.usersRepo.findAll(skip, perPage);
  }
}
