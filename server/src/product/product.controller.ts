import {
  Controller,
  Get,
  Query,
  Res,
  HttpStatus,
  Post,
  Body,
  Patch,
  Param,
  Req,
  Delete,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UseAuthGuard } from 'src/authentication/decorators/use.auth.guard.decorator';
import { CreateProductDto } from './dto/createProduct.dto';
import { GetRegionProductAPIDto } from './dto/getRegionProducts.dto';
import { UpdateProductDto } from './dto/updateProductDto';
import { ProductService } from './product.service';

@Controller('products')
@UseAuthGuard()
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

  @Post()
  async createProduct(
    @Res() res: Response,
    @Req() req: Request,
    @Body() createProductDto: CreateProductDto,
  ) {
    const { id: sellerId } = req['user'];
    const newProduct = await this.productService.createNewProduct({
      createProductDto,
      ...sellerId,
    });

    return res.status(HttpStatus.OK).json(newProduct);
  }

  @Patch('/:productId')
  async updateProduct(
    @Res() res: Response,
    @Req() req: Request,
    @Param('productId') productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const { id: sellerId } = req['user'];
    const updatedProduct = await this.productService.updateProductById(
      productId,
      sellerId,
      updateProductDto,
    );
    return res.status(HttpStatus.OK).json(updatedProduct);
  }
}
