import colors from '@constants/colors';
import { fontSize } from '@constants/fonts';
import mixin from '@style/mixin';
import styled from 'styled-components';

export default function TitleInput() {
  return (
    <>
      <Container>
        <CustomInput placeholder="글 제목" />
      </Container>
      <div />
    </>
  );
}

const Container = styled.div`
  padding: 24px 0;
`;

const CustomInput = styled.input`
  width: 100%;
  background-color: ${colors.white};
  border: 0;
  font-size: ${fontSize.medium};
  ::placeholder {
    color: ${colors.grey1};
  }
  :focus {
    border: 0;
  }
`;
