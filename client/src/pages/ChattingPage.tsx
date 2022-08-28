import Chatting from '@components/ChattingRoom/Chatting';
import ChattingProductInfo from '@components/ChattingRoom/ChattingProductInfo';
import NavigationBar from '@components/common/NavigationBar';
import TransitionPage from '@components/TransitionPage';
import { useChatRoom } from '@queries/useChatRoom';
import { useParams } from 'react-router-dom';

export default function ChattingPage() {
  const { chatRoomId } = useParams();
  const { chatRoom } = useChatRoom(Number(chatRoomId));

  return (
    <TransitionPage depth={2}>
      <NavigationBar title="채팅" />
      <ChattingProductInfo productId={chatRoom?.productId || 0} />
      <Chatting chatRoom={chatRoom} />
    </TransitionPage>
  );
}
