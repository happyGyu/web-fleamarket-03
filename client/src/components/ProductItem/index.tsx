import { GetRegionProductAPIDto } from '@customTypes/product';

interface ProductItemProps {
  productInfo: GetRegionProductAPIDto;
}

export default function ProductItem({ productInfo }: ProductItemProps) {
  return <div>hi</div>;
}
