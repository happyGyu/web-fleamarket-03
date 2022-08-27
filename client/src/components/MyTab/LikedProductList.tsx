import ProductItem from '@components/ProductItemList/ProductItem';
import { useLikedProducts } from '@queries/useMyLikedProduct';

export default function LikedProductList() {
  const { data } = useLikedProducts();

  return (
    <div>
      {data &&
        data.map((product) => (
          <ProductItem key={product.id} productId={product.id} utilButtonInfo={{ type: 'like' }} />
        ))}
    </div>
  );
}
