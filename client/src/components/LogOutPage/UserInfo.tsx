import NavigationBar from '@components/common/NavigationBar';
import PageContainer from '@components/common/PageContainer';
import useUser from '@queries/useUser';

export default function LogOutPage() {
  const { getUser } = useUser();
  const { data: user } = getUser();

  return (
    <>
      <NavigationBar shadowColor="transparent" title="로그아웃" />
      <PageContainer>
        <h2>{user.name}님, 황금마켓에서의 시간은 즐거우셨나요?</h2>
      </PageContainer>
    </>
  );
}
