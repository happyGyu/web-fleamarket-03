import Button from '@components/common/Button';
import { IChatRoom } from '@customTypes/chat';
import { useNavigate } from 'react-router-dom';

interface ChatButtonProps {
  chattingRooms: IChatRoom[];
  productId: number;
}

export default function ChatButton({ chattingRooms, productId }: ChatButtonProps) {
  const numberOfChattingRooms = chattingRooms.length;
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/products/chatting-room/${productId}`);
  };

  return (
    <Button onClick={onClick} size="medium">
      채팅 목록 보기 {numberOfChattingRooms ? `(${numberOfChattingRooms})` : ''}{' '}
    </Button>
  );
}
