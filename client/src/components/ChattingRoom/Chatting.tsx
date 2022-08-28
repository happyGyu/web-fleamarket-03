import colors from '@constants/colors';
import useChat from '@hooks/chat/useChat';
import mixin from '@style/mixin';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
// import useChat from '@hooks/chat/useChat';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';

export default function Chatting() {
  const { chatRoomId } = useParams();
  const { messages, sendMessage } = useChat(Number(chatRoomId));

  return (
    <Container>
      <ChatDisplay messages={messages} />
      <ChatInput sendMessage={sendMessage} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  flex: 2;
  height: 100px;
  box-shadow: inset 0px -1px 0px ${colors.grey3};
  ${mixin.flexMixin({ direction: 'column' })};
`;
