import Caption from '@components/common/Caption';
import CountIndicator from '@components/common/CountIndicator';
import LoadingIndicator from '@components/common/LoadingIndicator';
import { Text } from '@components/common/Text';
import Thumbnail from '@components/common/Thumbnail';
import colors from '@constants/colors';
import { useProduct } from '@queries/useProduct';
import mixin from '@style/mixin';
import { getPassedTimeString } from '@utils/common';
import { getLastAddress, getPriceString } from '@utils/product';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface ProductItemProps {
  productId: number;
  UtilButton: React.ReactNode;
}

export default function ProductItem({ productId, UtilButton }: ProductItemProps) {
  const navigate = useNavigate();
  const { data: product } = useProduct(productId);

  if (!product) return <LoadingIndicator />;

  const moveToDetailPage = () => {
    navigate(`/product/${product.id}`);
  };

  const { thumbnails, name, region, createdAt, price, likedUsers } = product;
  return (
    <Container onClick={moveToDetailPage}>
      <Thumbnail src={thumbnails[0]} size="medium" />
      <ProductInfoContainer>
        <Text size="large" weight="bold">
          {name}
        </Text>
        <Caption captions={[getLastAddress(region.address), getPassedTimeString(createdAt)]} />
        <Text weight="bold">{getPriceString(price)}</Text>
      </ProductInfoContainer>
      <UtilButtonWrapper>{UtilButton}</UtilButtonWrapper>
      <CountIndicatorWrapper>
        {likedUsers.length && <CountIndicator type="like" count={likedUsers.length} />}
      </CountIndicatorWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid ${colors.grey2};
`;

const ProductInfoContainer = styled.div`
  ${mixin.flexMixin({ direction: 'column' })}
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const UtilButtonWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const CountIndicatorWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  ${mixin.flexMixin({ align: 'center' })}
  gap: 1rem;
`;
