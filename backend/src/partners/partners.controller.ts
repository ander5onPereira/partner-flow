import { Controller, Get, Param } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('partners')
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Get(':id/commissions')
  @ApiOperation({ summary: 'Get partner commissions aggregated' })
  getCommissions(@Param('id') id: string) {
    return this.partnersService.getCommissions(Number(id));
  }
}
