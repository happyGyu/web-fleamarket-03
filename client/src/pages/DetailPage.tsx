import { useParams } from 'react-router-dom';
import DetailPageNavigationBar from '@components/DetailPageNavigationBar';
import { useQuery } from '@tanstack/react-query';
import { getProductDetail } from '@apis/product';
import { getUser } from '@apis/user';
import SaleStateSelector from '@components/SaleStateSelector';
import LoadingIndicator from '@components/common/LoadingIndicator';
import ImageSlider from '@components/ImageSlider.tsx';
import styled from 'styled-components';
import mixin from '@style/mixin';
import { padding } from '@constants/padding';

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
    <Container>
      <DetailPageNavigationBar />
      <ImageSlider images={['1']} />
      <DetailPageBody>
        {user?.id === product.seller.id && (
          <SaleStateSelector initialStatus={product.salesStatus} />
        )}
      </DetailPageBody>
    </Container>
  );
}

const Container = styled.div`
  ${mixin.flexMixin({ direction: 'column' })}
  gap: 1.5rem;
`;

const DetailPageBody = styled.div`
  padding: 0 ${padding.pageSide};
`;
