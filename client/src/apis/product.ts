import { GetRegionProductAPIDto, IProduct } from '@customTypes/product';
import myAxios from './myAxios';

export async function getRegionProducts(regionId?: number) {
  if (!regionId) throw new Error('동네가 존재하지 않습니다.');
  try {
    const res: GetRegionProductAPIDto = await myAxios.get(`/products?region-id=${regionId}`);
    return res.data;
  } catch (e) {
    throw new Error('검색에 실패했습니다.');
  }
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

export async function toggleLike(productId?: number) {
  if (!productId) throw new Error('상품이 존재하지 않습니다.');
  const { data: result } = await myAxios.patch(`/products/like/${productId}`);
  return result.ok;
}
