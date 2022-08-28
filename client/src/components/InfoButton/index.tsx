import { createNewChattingRoom } from '@apis/chatRoom';
import Button from '@components/common/Button';
import { useNavigate } from 'react-router-dom';
import { IChatRoom } from '@customTypes/chat';
import { useUser } from '@queries/useUser';

interface InfoButtonProps {
  numberOfBuyer?: number;
  chattingRooms?: IChatRoom[];
  productId: number;
}

export default function InfoButton({ chattingRooms, numberOfBuyer, productId }: InfoButtonProps) {
  const navigate = useNavigate();
  const { user } = useUser();
  const enterChatRoom = async () => {
    const existedRoom = chattingRooms?.find((chattingRoom) => chattingRoom.peer.id === user.id);
    if (existedRoom) {
      navigate(`/chatting-room/${existedRoom.id}`);
    }

    const newChattingId = await createNewChattingRoom(productId);
    navigate(`/chatting-room/${newChattingId}`);
  };

  return (
    <Button onClick={enterChatRoom} size="medium">
      문의하기 {numberOfBuyer ? `(${numberOfBuyer})` : ''}
    </Button>
  );
}
