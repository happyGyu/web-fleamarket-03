import CountIndicator from '@components/common/CountIndicator';
import { Text } from '@components/common/Text';
import Thumbnail from '@components/common/Thumbnail';
import colors from '@constants/colors';
import { GetRegionProductAPIDto } from '@customTypes/product';
import mixin from '@style/mixin';
import { calTimePassed } from '@utils/common';
import { getLastAddress } from '@utils/product';
import styled from 'styled-components';

interface ProductItemProps {
  productInfo: GetRegionProductAPIDto;
}

export default function ProductItem({ productInfo }: ProductItemProps) {
  const getPassedTimeString = (timeString: string) => {
    const createdTime = new Date(timeString);
    return `${calTimePassed(createdTime)} 전`;
  };

  const { thumbnail, name, region, createdAt, price, likedUsers } = productInfo;
  return (
    <Container>
      <Thumbnail src={thumbnail} size="medium" />
      <ProductInfoContainer>
        <Text size="large" weight="bold">
          {name}
        </Text>
        <Text color={colors.grey1}>{`${getLastAddress(region.address)} · ${getPassedTimeString(
          createdAt,
        )}`}</Text>
        <Text weight="bold">{`${price.toLocaleString()}원`}</Text>
      </ProductInfoContainer>
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

const CountIndicatorWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  ${mixin.flexMixin({ align: 'center' })}
  gap: 1rem;
`;
