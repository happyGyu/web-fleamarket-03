import { GetRegionProductAPIDto } from '@customTypes/product';
import axios from 'axios';

export async function getRegionProducts(regionId: number) {
  try {
    const res: GetRegionProductAPIDto = await axios.get(`/products?region-id=${regionId}`);
    return res.data;
  } catch (e) {
    throw new Error('검색에 실패했습니다.');
  }
}
