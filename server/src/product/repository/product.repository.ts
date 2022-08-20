import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
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
      relations: { region: true },
    });
  }
}
