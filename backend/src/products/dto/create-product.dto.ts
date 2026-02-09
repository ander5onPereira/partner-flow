import { IsNotEmpty, IsPositive, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Product A' })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 25.5 })
  @IsPositive()
  price!: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  active?: boolean;
}
