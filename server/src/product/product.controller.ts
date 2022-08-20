import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getRegionProducts(
    @Res() res: Response,
    @Query('region-id') regionId: number,
  ) {
    const products = await this.productService.getRegionProducts(regionId);
    return res.status(HttpStatus.OK).json({ ok: true, products });
  }
}
