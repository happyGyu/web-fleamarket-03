import myAxios from '@apis/myAxios';
import Button from '@components/common/Button';

export default function LogOutButton() {
  const logOut = () => {
    myAxios.post('/auth/logout');
  };
  return (
    <Button size="large" onClick={logOut}>
      로그아웃
    </Button>
  );
}
