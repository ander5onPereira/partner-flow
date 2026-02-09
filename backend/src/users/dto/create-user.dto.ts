import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Role {
  ADMIN = 'ADMIN',
  PARTNER = 'PARTNER',
  CUSTOMER = 'CUSTOMER'
}

export class CreateUserDto {
  @ApiProperty({ example: 'João Silva' })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'joao@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: Role.PARTNER, enum: Role })
  @IsEnum(Role)
  role!: Role;
}
