import { GetRegionProductAPIDto } from '@customTypes/product';
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
