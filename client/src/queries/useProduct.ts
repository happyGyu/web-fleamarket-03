import myAxios from '@apis/myAxios';
import { IProduct } from '@customTypes/product';
import { useQuery } from '@tanstack/react-query';

export async function getProductDetail(productId?: number) {
  if (!productId) throw new Error('상품이 존재하지 않습니다.');
  try {
    const { data: product } = await myAxios.get<IProduct>(`/products/${productId}`);
    return product;
  } catch (e) {
    throw new Error('상품 조회에 실패했습니다.');
  }
}

export const useProduct = (productId: number) =>
  useQuery(['product', productId], () => getProductDetail(Number(productId)), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
