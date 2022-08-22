import { useParams } from 'react-router-dom';
import DetailPageNavigationBar from '@components/DetailPageNavigationBar';
import { useQuery } from '@tanstack/react-query';
import { getProductDetail } from '@apis/product';

export default function ErrorPDetailPageage() {
  const { productId } = useParams();
  const { data: product } = useQuery(['product', productId], () =>
    getProductDetail(Number(productId)),
  );

  return <DetailPageNavigationBar />;
}
