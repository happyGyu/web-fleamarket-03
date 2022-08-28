import Chatting from '@components/ChattingRoom/Chatting';
import ChattingProductInfo from '@components/ChattingRoom/ChattingProductInfo';
import NavigationBar from '@components/common/NavigationBar';
import TransitionPage from '@components/TransitionPage';

export default function ChattingPage() {
  return (
    <TransitionPage depth={2}>
      <NavigationBar title="채팅" />
      <ChattingProductInfo />
      <Chatting />
    </TransitionPage>
  );
}
