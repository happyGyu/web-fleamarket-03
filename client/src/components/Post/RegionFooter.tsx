import MapPinIcon from '@assets/icons/MapPinIcon';
import { Text } from '@components/common/Text';
import colors from '@constants/colors';
import { padding } from '@constants/padding';
import mixin from '@style/mixin';
import styled from 'styled-components';

export default function RegionFooter() {
  return (
    <>
      <Container>
        <MapPinIcon />
        <Text size="small">역삼동</Text>
      </Container>
      <div />
    </>
  );
}

const Container = styled.div`
  position: absolute;
  color: ${colors.black};
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px ${padding.pageSide};
  border-top: 1px solid ${colors.grey3};
  ${mixin.flexMixin({ align: 'center' })}
  gap: 4px;

  svg {
    stroke: ${colors.black};
    width: 1rem;
    height: 1rem;
  }
`;
