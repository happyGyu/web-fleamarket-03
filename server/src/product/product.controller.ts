import {
  Controller,
  Get,
  Query,
  Res,
  HttpStatus,
  Param,
  Delete,
  Req,
  Patch,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UseAuthGuard } from 'src/authentication/decorators/use.auth.guard.decorator';
import { GetRegionProductAPIDto } from './dto/getRegionProducts.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':productId')
  async getProduct(
    @Res() res: Response,
    @Param('productId') productId: number,
  ) {
    const parsedProductDetail =
      await this.productService.getAndParseProductDetail(productId);
    return res.status(HttpStatus.OK).json(parsedProductDetail);
  }

  @Get()
  @UseAuthGuard()
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
    return res.status(HttpStatus.OK).json(parsedProducts);
  }

  @Delete(':productId')
  @UseAuthGuard()
  async deleteProduct(
    @Req() req: Request,
    @Res() res: Response,
    @Param('productId') productId: number,
  ) {
    const loginUser = req['user'];
    await this.productService.deleteProduct(productId, loginUser.id);
    return res.status(HttpStatus.OK).json({ ok: true });
  }

  @Patch('/like/:productId')
  @UseAuthGuard()
  async toggleLikeState(
    @Req() req: Request,
    @Res() res: Response,
    @Param('productId') productId: number,
  ) {
    const loginUser = req['user'];
    await this.productService.toggleLikeState({
      productId,
      userId: loginUser.id,
    });
    return res.status(HttpStatus.NO_CONTENT).json({ ok: true });
  }
}
