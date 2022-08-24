import { LikeRepository } from './repository/like.repository';
import { ProductRepository } from './repository/product.repository';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProductDto';
import { LikeDto } from './dto/like.dto';
import { GetProductDetailDto } from './dto/getProductDetail.dto';
import { CategoryRepository } from './repository/category.repository';
import { Category } from './entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly likeRepository: LikeRepository,
    private readonly categoryRepository: CategoryRepository,
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

  getCategories(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  getProduct(productId: number): Promise<Product> {
    return this.productRepository.findOneByProductId(productId);
  }

  async getAndParseProductDetail(productId: number) {
    const {
      seller: { regions: rawSellerRegion, ...sellerData },
      ...restData
    } = await this.getProduct(productId);
    const parsedSellerRegion = rawSellerRegion.map((rawSellerRegion) => ({
      id: rawSellerRegion.region.id,
      address: rawSellerRegion.region.address,
    }));
    const parsedProduct: GetProductDetailDto = {
      ...restData,
      seller: { regions: parsedSellerRegion, ...sellerData },
    };
    return parsedProduct;
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
