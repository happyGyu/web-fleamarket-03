import portalUtil from '@utils/portal';
import styled from 'styled-components';

export default function LoadingIndicator() {
  const Portal = portalUtil.openPortal();

  return (
    <Portal>
      <IndicatorWrapper />
    </Portal>
  );
}

const IndicatorWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
