import GlobalStyle from '@style/GlobalStyle';
import Routes from '@pages/Routes';
import styled from 'styled-components';

export default function App() {
  return (
    <Display>
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
