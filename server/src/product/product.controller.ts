import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { GetRegionProductAPIDto } from './dto/getRegionProducts.dto';
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
    const parsedProducts: GetRegionProductAPIDto[] = products.map((product) => {
      const {
        id,
        name,
        price,
        region,
        salesStatus,
        createdAt,
        thumbnails,
        likedUsers,
      } = product;
      return {
        id,
        name,
        price,
        region,
        salesStatus,
        createdAt,
        likedUsers,
        thumbnail: thumbnails[0],
      };
    });
    return res
      .status(HttpStatus.OK)
      .json({ ok: true, products: parsedProducts });
  }
}
