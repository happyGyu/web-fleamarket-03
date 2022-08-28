import colors from '@constants/colors';
import mixin from '@style/mixin';
import styled from 'styled-components';

export default function ChatInput() {
  return (
    <InputContainer>
      <CustomInput placeholder="메세지를 입력해주세요" />
      <SubmitBtn>보내기</SubmitBtn>
    </InputContainer>
  );
}

const CustomInput = styled.input`
  background: ${colors.white};
  border: 1px solid ${colors.grey3};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px 12px;
  width: 100%;
  height: 44px;
`;

const SubmitBtn = styled.button`
  width: 50px;
`;

const InputContainer = styled.div`
  background: ${colors.offWhite};
  box-shadow: inset 0px 1px 0px ${colors.grey3};
  ${mixin.flexMixin({ direction: 'row', align: 'center' })};
  padding: 0 12px;
  height: 72px;
  gap: 12px;
  width: 100%;
`;
