import { IChatRoom } from '@customTypes/chat';
import ChattingList from './ChattingList';

interface ChattingRoomInfoProps {
  chattingRoomsInfo: IChatRoom[];
}
export default function ChattingRoom({ chattingRoomsInfo }: ChattingRoomInfoProps) {
  return (
    <ul>
      {chattingRoomsInfo.map((chatRoomInfo) => {
        const { productId, id, peer, messages } = chatRoomInfo;
        const latestMessage = messages[0];
        const latestMessageTime = latestMessage?.createdAt;
        return <ChattingList {...{ id, peer, latestMessage, latestMessageTime, productId }} />;
      })}
    </ul>
  );
}
