import NavigationBar from '@components/common/NavigationBar';
import ChattingRoom from '@components/MyTab/ChattingRoom';
import TransitionPage from '@components/TransitionPage';
import { useMyProductChatRooms } from '@queries/useChatRoom';
import { useParams } from 'react-router-dom';

export default function MyProductChatRoomPage() {
  const { productId } = useParams();

  const { myProductChatRooms } = useMyProductChatRooms(Number(productId));

  return (
    <TransitionPage depth={2}>
      <NavigationBar title="채팅하기" />
      <ChattingRoom chattingRoomsInfo={myProductChatRooms || []} />
    </TransitionPage>
  );
}
