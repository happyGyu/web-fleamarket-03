import { useParams } from 'react-router-dom';
import DetailPageNavigationBar from '@components/DetailPageNavigationBar';
import { useQuery } from '@tanstack/react-query';
import { getProductDetail } from '@apis/product';
import { getUser } from '@apis/user';
import SaleStateSelector from '@components/SaleStateSelector';
import LoadingIndicator from '@components/common/LoadingIndicator';

export default function DetailPage() {
  const { productId } = useParams();
  const { data: product } = useQuery(['product', productId], () =>
    getProductDetail(Number(productId)),
  );
  const { data: user } = useQuery(['user'], getUser);

  if (!product) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <DetailPageNavigationBar />
      <SaleStateSelector initialStatus={product.salesStatus} />
    </>
  );
}
