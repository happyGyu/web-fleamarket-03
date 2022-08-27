import NavigationBar from '@components/common/NavigationBar';
import PageContainer from '@components/common/PageContainer';
import LogOutButton from '@components/LogOutPage/LogOutButton';
import { useUser } from '@queries/useUser';
import mixin from '@style/mixin';
import styled from 'styled-components';

export default function LogOutPage() {
  const { user } = useUser();

  return (
    <>
      <NavigationBar shadowColor="transparent" title="로그아웃" />
      <LogoutPageContainer>
        <LogoutPageImage src="/sadBadal.png" alt="슬픈배달이" />
        <h2>{`"${user.name}"`} 님, 벌써 가시나요?</h2>
        <LogOutButton />
      </LogoutPageContainer>
    </>
  );
}

const LogoutPageContainer = styled(PageContainer)`
  margin-top: 3rem;
  ${mixin.flexMixin({ direction: 'column', align: 'center' })}
  gap: 2rem;
`;

const LogoutPageImage = styled.img`
  width: 10rem;
  height: 10rem;
`;
