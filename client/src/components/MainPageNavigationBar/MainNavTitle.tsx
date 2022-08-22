import { getUser } from '@apis/user';
import MapPinIcon from '@assets/icons/MapPinIcon';
import LoadingIndicator from '@components/common/LoadingIndicator';
import { Text } from '@components/common/Text';
import colors from '@constants/colors';
import mixin from '@style/mixin';
import { useQuery } from '@tanstack/react-query';
import { getLastAddress } from '@utils/product';
import styled from 'styled-components';

export default function MainNavTitle() {
  const { data: user } = useQuery(['user'], getUser);
  return user ? (
    <Container>
      <MapPinIcon />
      <Text>{getLastAddress(user.regions[0].region.address)}</Text>
    </Container>
  ) : (
    <LoadingIndicator />
  );
}

const Container = styled.button`
  ${mixin.flexMixin({ align: 'center' })}
  gap: 0.25rem;
  ${Text} {
    color: ${colors.white};
  }
  svg {
    scale: 0.9;
    stroke: ${colors.white};
  }
`;
