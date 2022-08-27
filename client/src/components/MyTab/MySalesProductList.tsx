import ProductItem from '@components/ProductItemList/ProductItem';
import colors from '@constants/colors';
import { useMySalesProducts } from '@queries/useMySalesProducts';

export default function MySalesProductList() {
  const { data } = useMySalesProducts();

  return (
    <div>
      {data &&
        data.map((product) => (
          <ProductItem
            key={product.id}
            productId={product.id}
            utilButtonInfo={{ type: 'more', color: colors.grey2 }}
          />
        ))}
    </div>
  );
}
