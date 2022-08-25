import MoreButton from '@components/MoreButton';
import ProductItem from '@components/ProductItem';
import colors from '@constants/colors';
import { useMySalesProducts } from '@queries/useMySalesProducts';

export default function MySalesProductLis() {
  const { data } = useMySalesProducts();

  return (
    <div>
      {data &&
        data.map((product) => (
          <ProductItem
            key={product.id}
            productInfo={product}
            UtilButton={<MoreButton color={colors.grey2} />}
          />
        ))}
    </div>
  );
}
