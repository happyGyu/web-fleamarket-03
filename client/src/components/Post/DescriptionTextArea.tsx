import colors from '@constants/colors';
import { fontSize } from '@constants/fonts';
import styled from 'styled-components';

export default function DescriptionTextArea() {
  return (
    <Container>
      <CustomTextArea contentEditable placeholder="게시글 내용을 작성해주세요" />
    </Container>
  );
}

const Container = styled.div`
  padding: 24px 0 18px 0;
`;

const CustomTextArea = styled.div`
  width: 100%;
  height: 100%;
  color: ${colors.black};
  line-height: 22px;

  background-color: ${colors.white};
  border: 0;
  font-size: ${fontSize.medium};
  ::placeholder {
    color: ${colors.grey1};
  }
  :focus {
    border: 0;
    outline: 0;
  }
  &[contenteditable='true'] {
    position: relative;
  }

  &[contenteditable='true']:empty:before {
    content: attr(placeholder);
    position: absolute;
    left: 0;
    right: 0;
    top: 4px;
    margin: auto;
    color: ${colors.grey2};
  }
`;
