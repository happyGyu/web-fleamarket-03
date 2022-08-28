import colors from '@constants/colors';
import mixin from '@style/mixin';
import styled, { css } from 'styled-components';

export default function ChatDisplay() {
  const chats = [
    {
      id: 1,
      content: '안녕하세요1 저는 금교영이라는 사람입니다. 앞으로도 잘 부탁 드려요',
    },
    {
      id: 1,
      content: '안녕하세요1 저는 금교영이라는 사람입니다. 앞으로도 잘 부탁 드려요',
    },
    {
      id: 1,
      content: '안녕하세요1 저는 금교영이라는 사람입니다. 앞으로도 잘 부탁 드려요',
    },
    {
      id: 1,
      content: '안녕하세요1 저는 금교영이라는 사람입니다. 앞으로도 잘 부탁 드려요',
    },

    {
      id: 2,
      content: '안녕하세요1 저는 금교영이라는 사람입니다. 앞으로도 잘 부탁 드려요',
    },
    {
      id: 1,
      content: '안녕하세요3',
    },
    {
      id: 2,
      content: '안녕하세요4',
    },
    {
      id: 1,
      content: '안녕하세요5',
    },
    {
      id: 2,
      content: '안녕하세요6',
    },
    {
      id: 1,
      content: '안녕하세요7',
    },
  ];

  return (
    <ChatDisplayContainer>
      {chats.map((chat) => (
        <ChatContainer isUser={chat.id === 1}>
          <Chat isUser={chat.id === 1}>{chat.content}</Chat>
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
