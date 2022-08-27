import styled from 'styled-components';
import { redirectToOAuthUrl } from '@utils/oAuth';
import Button from '@components/common/Button';
import mixin from '@style/mixin';
import TransitionPage from '@components/TransitionPage';

export default function LoginPage() {
  return (
    <TransitionPage
      depth={2}
      mountAnimation={[
        { transform: 'translateY(-5%)', opacity: '1' },
        { transform: 'translateY(0)', opacity: '1' },
      ]}
      keyframeOption={{ easing: 'cubic-bezier(0.33, 1, 0.68, 1)', duration: 1000 }}
    >
      <LoginPageWrapper>
        <Logo src="./goldmarket-logo.png" />
        <WelcomeMessage>간편하게 황금마켓을 시작하세요</WelcomeMessage>
        <StartButtonWrapper>
          <Button type="button" size="large" onClick={() => alert('카카오톡으로 시작')}>
            카카오톡으로 시작
          </Button>
          <Button type="button" size="large" onClick={() => redirectToOAuthUrl('GITHUB')}>
            깃허브로 시작
          </Button>
          <Button type="button" size="large" onClick={() => alert('네이버로 시작')}>
            네이버로 시작
          </Button>
        </StartButtonWrapper>
      </LoginPageWrapper>
    </TransitionPage>
  );
}

const LoginPageWrapper = styled.div`
  ${mixin.flexMixin({ direction: 'column', justify: 'center', align: 'center' })}
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
  ${mixin.flexMixin({ direction: 'column', align: 'center' })}
  gap: 1rem;
`;
