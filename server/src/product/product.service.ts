import { LikeRepository } from './repository/like.repository';
import { ProductRepository } from './repository/product.repository';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProductDto';
import { LikeDto } from './dto/like.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly likeRepository: LikeRepository,
  ) {}

  getRegionProducts(regionId: number): Promise<Product[]> {
    return this.productRepository.findProductsByRegion(regionId);
  }

  createNewProduct(createProductDto: CreateProductDto) {
    return this.productRepository.createProduct(createProductDto);
  }

  updateProductById(
    id: number,
    sellerId: number,
    updateProductDto: UpdateProductDto,
  ) {
    return this.productRepository.patchProductById(
      id,
      sellerId,
      updateProductDto,
    );
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

  async toggleLikeState(likeDto: LikeDto) {
    const like = await this.likeRepository.findLike(likeDto);
    if (like) {
      this.likeRepository.deleteLike(likeDto);
    } else {
      this.likeRepository.addLike(likeDto);
    }
  }
}
