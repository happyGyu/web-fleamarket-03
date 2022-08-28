import colors from '@constants/colors';
import mixin from '@style/mixin';
import styled, { css } from 'styled-components';
import { Message } from '@hooks/chat/useChat';
import { useUser } from '@queries/useUser';
import { useRef } from 'react';

interface ChatDisplayProps {
  messages?: Message[];
}

export default function ChatDisplay({ messages = [] }: ChatDisplayProps) {
  const { user } = useUser();
  return (
    <ChatDisplayContainer>
      {messages.map((message) => (
        <ChatContainer key={message.id} isUser={message.senderId === user.id}>
          <Chat isUser={message.senderId === user.id}>{message.content}</Chat>
        </ChatContainer>
      ))}
    </ChatDisplayContainer>
  );
}

const ChatDisplayContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  background-color: ${colors.white};
  ${mixin.flexMixin({ direction: 'column-reverse' })};
  flex: 1;
`;

const Chat = styled.div<{ isUser: boolean }>`
  display: flex;
  margin: 10px;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px;
  font-size: 14px;
  max-width: 50%;
  line-height: 16px;

  ${({ isUser }) =>
    isUser
      ? css`
          background: #2ac1bc;
          border-radius: 8px 0px 8px 8px;
          color: ${colors.white};
        `
      : css`
          background: #ffffff;
          border: 1px solid #2ac1bc;
          border-radius: 0px 8px 8px 8px;
          color: ${colors.black};
        `}
`;

const ChatContainer = styled.div<{ isUser: boolean }>`
  width: 100%;
  ${({ isUser }) => mixin.flexMixin({ direction: isUser ? 'row-reverse' : 'row' })};
`;
