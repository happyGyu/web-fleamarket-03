import LikeButton from '@components/LikeButton';
import ProductItem from '@components/ProductItem';
import { useLikedProducts } from '@queries/useMyLikedProduct';

export default function LikedProductList() {
  const { data } = useLikedProducts();

  return (
    <div>
      {data &&
        data.map((product) => (
          <ProductItem
            key={product.id}
            productId={product.id}
            UtilButton={<LikeButton productId={product.id} />}
          />
        ))}
    </div>
  );
}
