import GlobalStyle from '@style/GlobalStyle';
import Routes from '@pages/Routes';
import styled from 'styled-components';
import portalUtil from '@utils/portal';
import { useRef, useEffect } from 'react';
import mixin from '@style/mixin';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function App() {
  const displayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!displayRef.current) return;
    portalUtil.setPortalRoot(displayRef.current);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <AppWrapper>
        <Display ref={displayRef}>
          <GlobalStyle />
          <Routes />
        </Display>
      </AppWrapper>
    </QueryClientProvider>
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
  overflow-x: hidden;
  overflow-y: auto;
  border: 5px solid black;
`;
