import LikeButton from '@components/common/LikeButton';
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
            productInfo={product}
            UtilButton={LikeButton({
              productId: product.id,
              likedUsers: product.likedUsers,
            })}
          />
        ))}
    </div>
  );
}
