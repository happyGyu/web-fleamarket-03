import GlobalStyle from '@style/GlobalStyle';
import Routes from '@pages/Routes';
import styled from 'styled-components';
import portalUtil from '@utils/portal';
import { useRef, useEffect } from 'react';

export default function App() {
  const displayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!displayRef.current) return;
    portalUtil.setPortalRoot(displayRef.current);
  }, []);

  return (
    <Display ref={displayRef}>
      <GlobalStyle />
      <Routes />
    </Display>
  );
}

const Display = styled.div`
  width: 26rem;
  height: 56rem;
  border: 5px solid black;
`;
