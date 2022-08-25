import NavigationBar from '@components/common/NavigationBar';
import MyTab from '@components/MyTab';

export default function MyPage() {
  return (
    <>
      <NavigationBar shadowColor="transparent" title="메뉴" />
      <MyTab />
    </>
  );
}
