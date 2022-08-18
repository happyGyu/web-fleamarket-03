import BasicButton from '@components/common/BasicButton';
import styled from 'styled-components';

export default function LoginPage() {
  return (
    <LoginPageWrapper>
      <Logo src="./goldmarket-logo.png" />
      <WelcomeMessage>간편하게 황금마켓을 시작하세요</WelcomeMessage>
      <StartButtonWrapper>
        <BasicButton text="카카오톡으로 시작" onClick={() => alert('카카오톡로 시작')} />
        <BasicButton text="깃허브로 시작" onClick={() => alert('깃허브로 시작')} />
        <BasicButton text="네이버로 시작" onClick={() => alert('네이버로 시작')} />
      </StartButtonWrapper>
    </LoginPageWrapper>
  );
}

const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 1rem;
`;

const Logo = styled.img`
  width: 10rem;
  height: 8rem;
`;

const WelcomeMessage = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 3rem 0;
`;

const StartButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
