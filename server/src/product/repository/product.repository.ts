import { DataSource, Repository } from 'typeorm';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductRepository {
  private repository: Repository<Product>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Product);
  }

  public async findProductsByRegion(regionId: number): Promise<Product[]> {
    return this.repository.find({
      where: { regionId },
      relations: ['region', 'likedUsers'],
    });
  }

  public async findOneByProductId(id: number) {
    try {
      return this.repository.findOne({
        where: { id },
        relations: ['region', 'seller', 'likedUsers'],
      });
    } catch (e) {
      throw new HttpException(
        '존재하지 않는 상품입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async deleteProductById(id: number) {
    try {
      return this.repository.delete({ id });
    } catch (e) {
      throw new HttpException(
        '상품 삭제에 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
