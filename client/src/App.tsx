import GlobalStyle from '@style/GlobalStyle';
import Routes from '@pages/Routes';
import styled from 'styled-components';
import portalUtil from '@utils/portal';
import { useRef, useEffect } from 'react';
import mixin from '@style/mixin';

export default function App() {
  const displayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!displayRef.current) return;
    portalUtil.setPortalRoot(displayRef.current);
  }, []);

  return (
    <AppWrapper>
      <Display ref={displayRef}>
        <GlobalStyle />
        <Routes />
      </Display>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  ${mixin.flexMixin({ justify: 'center', align: 'center' })};
  height: 100vh;
`;

const Display = styled.div`
  position: relative;
  width: 26rem;
  height: 56rem;
  border: 5px solid black;
`;
