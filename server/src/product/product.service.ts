import { ProductRepository } from './repository/product.repository';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  getRegionProducts(regionId: number): Promise<Product[]> {
    return this.productRepository.findProductsByRegion(regionId);
  }

  getProduct(productId: number): Promise<Product> {
    return this.productRepository.findOneByProductId(productId);
  }

  async deleteProduct(productId: number, userId: number) {
    const product = await this.getProduct(productId);
    if (product.sellerId === userId) {
      throw new HttpException(
        '삭제 권한이 없는 사용자입니다.',
        HttpStatus.NOT_ACCEPTABLE,
      );
    } else {
      this.productRepository.deleteProductById(productId);
    }
  }
}
