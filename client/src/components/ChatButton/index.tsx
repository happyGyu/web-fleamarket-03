import Button from '@components/common/Button';
import { IChatRoom } from '@customTypes/chat';
import { useNavigate } from 'react-router-dom';

interface ChatButtonProps {
  chattingRooms: IChatRoom[];
}

export default function ChatButton({ chattingRooms }: ChatButtonProps) {
  const numberOfChattingRooms = chattingRooms.length;
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/products/chattingRoom/');
  };

  return (
    <Button size="medium">
      채팅 목록 보기 {numberOfChattingRooms ? `(${numberOfChattingRooms})` : ''}{' '}
    </Button>
  );
}
