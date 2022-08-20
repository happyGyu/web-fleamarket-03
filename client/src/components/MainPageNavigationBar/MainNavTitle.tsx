import MapPinIcon from '@assets/icons/MapPinIcon';
import { Text } from '@components/common/Text';
import colors from '@constants/colors';
import mixin from '@style/mixin';
import styled from 'styled-components';

export default function MainNavTitle() {
  return (
    <Container>
      <MapPinIcon />
      <Text>역삼동</Text>
    </Container>
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
