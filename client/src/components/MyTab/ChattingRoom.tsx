import { Text } from '@components/common/Text';
import colors from '@constants/colors';
import mixin from '@style/mixin';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IChatRoom } from '@customTypes/chat';
import { calculatePassedTime } from '@utils/common';
import useProduct from '@queries/useProduct';

interface ChattingRooInfoProps {
  chattingRoomsInfo: IChatRoom[];
}
export default function ChattingRoom({ chattingRoomsInfo }: ChattingRooInfoProps) {
  const navigate = useNavigate();
  return (
    <ul>
      {chattingRoomsInfo.map((chatRoomInfo) => {
        const { id, peer, messages } = chatRoomInfo;
        const { product } = useProduct(chatRoomInfo.productId);
        const latestMessage = messages[0];
        const latestMessageTime = new Date(latestMessage?.createdAt);
        return (
          <ChattingRoomContainer key={id} onClick={() => navigate('/chatting-room')}>
            <BorderBox>
              <FlexColumnContainer>
                <Text size="medium" weight="bold">
                  {peer.name}
                </Text>
                <Text size="medium" color={colors.grey1}>
                  {latestMessage && latestMessage.content}
                </Text>
              </FlexColumnContainer>

              <FlexRowContainer>
                <FlexColumnContainer>
                  <Text color={colors.grey1} size="xSmall">
                    {latestMessage && calculatePassedTime(latestMessageTime)}
                  </Text>
                  {/* <Notification>
                    <Text size="xSmall" color={colors.white}>
                      {countOfUnreadMessage}
                    </Text>
                  </Notification> */}
                </FlexColumnContainer>
                <FlexColumnContainer>
                  <img src={product?.thumbnails[0] || ''} alt="" />
                </FlexColumnContainer>
              </FlexRowContainer>
            </BorderBox>
          </ChattingRoomContainer>
        );
      })}
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
