import { Category } from '@customTypes/category';
import {
  CreateProductAPIDto,
  GetRegionProductDto,
  IProduct,
  PatchProductDto,
} from '@customTypes/product';
import myAxios from './myAxios';

interface GetRegionProductsProps {
  regionId?: number;
  categoryId?: number;
  start?: number;
}

export async function getRegionProducts(queryConfig: GetRegionProductsProps) {
  const queryString = Object.entries(queryConfig).reduce(
    (query, [key, value]) => (value ? `${query}&${key}=${value}` : query),
    '',
  );
  const { data } = await myAxios.get<GetRegionProductDto>(`/products?${queryString}`);
  return data;
}

export async function getProductDetail(productId?: number) {
  if (!productId) throw new Error('상품이 존재하지 않습니다.');
  try {
    const { data: product } = await myAxios.get<IProduct>(`/products/${productId}`);
    return product;
  } catch (e) {
    throw new Error('상품 조회에 실패했습니다.');
  }
}

export async function createProduct(product: CreateProductAPIDto) {
  try {
    const { data } = await myAxios.post('/products', product);
    return data;
  } catch (e) {
    throw new Error('상품 등록에 실패했습니다.');
  }
}

export async function updateProduct(product: PatchProductDto, productId: number) {
  try {
    const { data } = await myAxios.patch(`/products/${productId}`, product);
    return data;
  } catch (e) {
    throw new Error('상품 수정에 실패했습니다.');
  }
}

export async function getCategories() {
  try {
    const { data } = await myAxios.get<Category[]>(`/products/categories`);
    return data;
  } catch (e) {
    throw new Error('상품 수정에 실패했습니다.');
  }
}
