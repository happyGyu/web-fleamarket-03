import Button from '@components/common/Button';
import { useNavigate } from 'react-router-dom';
import { IChatRoom } from '@customTypes/chat';
import { useUser } from '@queries/useUser';
import { useCreateChatRoom } from '@queries/useChatRoom';

interface InfoButtonProps {
  numberOfBuyer?: number;
  chattingRooms?: IChatRoom[];
  productId: number;
}

export default function InfoButton({ chattingRooms, numberOfBuyer, productId }: InfoButtonProps) {
  const navigate = useNavigate();
  const { user } = useUser();
  const { createChatRoom } = useCreateChatRoom();
  const enterChatRoom = async () => {
    const existedRoom = chattingRooms?.find((chattingRoom) => chattingRoom.peer.id === user.id);
    if (existedRoom) {
      navigate(`/chatting-room/${existedRoom.id}`);
    }

    const newChattingId = await createChatRoom(productId);
    navigate(`/chatting-room/${newChattingId}`);
  };

  return (
    <Button onClick={enterChatRoom} size="medium">
      문의하기 {numberOfBuyer ? `(${numberOfBuyer})` : ''}
    </Button>
  );
}
