import { Product } from 'src/product/entities/product.entity';
import { PickType } from '@nestjs/mapped-types';

export class GetRegionProductsDto extends PickType(Product, [
  'id',
  'name',
  'price',
  'region',
  'salesStatus',
  'createdAt',
]) {
  thumbnail: string;
}
