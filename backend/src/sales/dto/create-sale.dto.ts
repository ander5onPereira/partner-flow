import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSaleDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  productId!: number;

  @ApiProperty({ example: 3 })
  @IsInt()
  customerId!: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  partnerId!: number;
}
