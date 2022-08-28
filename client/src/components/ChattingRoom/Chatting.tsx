import colors from '@constants/colors';
import mixin from '@style/mixin';
import styled from 'styled-components';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';

export default function Chatting() {
  return (
    <Container>
      <ChatDisplay />
      <ChatInput />
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
