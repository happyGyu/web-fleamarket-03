import { Text } from '@components/common/Text';
import colors from '@constants/colors';
import mixin from '@style/mixin';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function ChattingRoom() {
  const navigate = useNavigate();
  const chattingRoomsInfo = [
    {
      peerUserName: '금교영',
      lastMessage: '파나요',
      lastMessageTime: '3분전',
      thumbnail:
        'https://img.29cm.co.kr/next-product/2022/05/17/0edb5a93efb1471eb9df7e9e31ed1909_20220517105255.png?width=600',
      countOfUnreadMessage: 2,
    },
    {
      peerUserName: '황태규',
      lastMessage: '오늘 끝내나요?',
      lastMessageTime: '2분전',
      thumbnail:
        'https://img.29cm.co.kr/next-product/2022/04/29/ef792e9fae8f4e6a9883d3a1a338a012_20220429103845.jpg?width=600',
      countOfUnreadMessage: 2,
    },
  ];

  return (
    <ul>
      {chattingRoomsInfo.map(
        ({ lastMessage, lastMessageTime, peerUserName, thumbnail, countOfUnreadMessage }) => (
          <ChattingRoomContainer key={peerUserName} onClick={() => navigate('/chatting-room')}>
            <BorderBox>
              <FlexColumnContainer>
                <Text size="medium" weight="bold">
                  {peerUserName}
                </Text>
                <Text size="medium" color={colors.grey1}>
                  {lastMessage}
                </Text>
              </FlexColumnContainer>

              <FlexRowContainer>
                <FlexColumnContainer>
                  <Text color={colors.grey1} size="xSmall">
                    {lastMessageTime}
                  </Text>
                  <Notification>
                    <Text size="xSmall" color={colors.white}>
                      {countOfUnreadMessage}
                    </Text>
                  </Notification>
                </FlexColumnContainer>
                <FlexColumnContainer>
                  <img src={thumbnail} alt="" />
                </FlexColumnContainer>
              </FlexRowContainer>
            </BorderBox>
          </ChattingRoomContainer>
        ),
      )}
    </ul>
  );
}

const BorderBox = styled.div`
  ${mixin.flexMixin({ justify: 'space-between' })};
  width: 100%;
  height: 100px;
  border-bottom: 0.4px solid #d7d7d7;
`;
const ChattingRoomContainer = styled.li`
  width: 100%;
  height: 100px;
  padding: 0 1.4rem;
  /* border: 0.4px solid #d7d7d7; */
  :hover {
    background-color: ${colors.offWhite};
  }
  position: relative;
  img {
    height: 60px;
    width: 60px;
    border: 1px solid ${colors.grey3};
    border-radius: 6px;
  }
`;

const FlexColumnContainer = styled.div`
  ${mixin.flexMixin({ direction: 'column', justify: 'center' })};
  gap: 6px;
  height: 100%;
`;

const FlexRowContainer = styled.div`
  ${mixin.flexMixin({ direction: 'row' })};
  gap: 1rem;
  height: 100%;
`;

const Notification = styled.div`
  background: ${colors.primary};
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
`;
