import { useParams } from 'react-router-dom';
import DetailPageNavigationBar from '@components/DetailPageNavigationBar';
import { useQuery } from '@tanstack/react-query';
import { getProductDetail } from '@apis/product';
import SaleStateSelector from '@components/SaleStateSelector';
import LoadingIndicator from '@components/common/LoadingIndicator';
import ImageSlider from '@components/ImageSlider.tsx';
import styled from 'styled-components';
import mixin from '@style/mixin';
import { padding } from '@constants/padding';
import { Text } from '@components/common/Text';
import Caption from '@components/common/Caption';
import { getLastAddress, getPriceString } from '@utils/product';
import { getPassedTimeString } from '@utils/common';
import colors from '@constants/colors';
import LikeButton from '@components/LikeButton';
import ChatButton from '@components/ChatButton';
import { useUser } from '@queries/useUser';
import { useProduct } from '@queries/useProduct';

export default function DetailPage() {
  const { productId } = useParams();
  const { data: product } = useProduct(Number(productId));
  const user = useUser();

  if (!product) {
    return <LoadingIndicator />;
  }
  const { name, createdAt, region, description, views, likedUsers, seller, id, price } = product;
  return (
    <Container>
      <DetailPageNavigationBar />
      <ImageSlider images={['1']} />
      <DetailPageBody>
        {user.id === product.seller.id && (
          <SaleStateSelector initialStatus={product.salesStatus} productId={id} />
        )}
        <DetailContent>
          <Text size="large" weight="bold">
            {name}
          </Text>
          <Caption
            size="small"
            captions={[getLastAddress(region.address), getPassedTimeString(createdAt)]}
          />
          <Description as="p" size="small">
            {description}
          </Description>
        </DetailContent>
        <Caption size="small" captions={[`관심 ${likedUsers.length}`, `조회 ${views}`]} />
        <SellerInfo>
          <Text size="small" weight="bold">
            판매자 정보
          </Text>
          <Text size="small" weight="bolder">
            {seller.name}
          </Text>
          <Text size="small" weight="medium" color={colors.grey1}>
            {getLastAddress(seller.regions[0].address)}
          </Text>
        </SellerInfo>
      </DetailPageBody>
      <DetailPageFooter>
        <LikeButton productId={id} />
        <Text weight="bolder">{getPriceString(price)}</Text>
        <ChatButton />
      </DetailPageFooter>
    </Container>
  );
}

const Container = styled.div`
  ${mixin.flexMixin({ direction: 'column' })}
  gap: 1.5rem;
`;

const DetailPageBody = styled.div`
  width: 100%;
  padding: 0 ${padding.pageSide};
  ${mixin.flexMixin({ direction: 'column' })}
  gap: 1.5rem;
`;

const DetailContent = styled.section`
  ${mixin.flexMixin({ direction: 'column' })}
  gap: 0.75rem;
`;

const Description = styled(Text)`
  margin: 0.5rem 0;
`;

const SellerInfo = styled.div`
  width: 100%;
  background-color: ${colors.offWhite};
  padding: 1rem 1.5rem;
  ${mixin.flexMixin({ justify: 'space-between' })}
  gap: 1rem;

  & :first-child {
    flex-grow: 1;
  }
`;

const DetailPageFooter = styled.div`
  position: absolute;
  bottom: 0;
  ${mixin.flexMixin({ align: 'center' })}
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  border-top: 1px solid ${colors.grey3};

  & span {
    line-height: 2rem;
    padding-left: 1rem;
    flex-grow: 1;
    border-left: 1px solid ${colors.grey3};
  }
`;
