import colors from '@constants/colors';
import styled from 'styled-components';
import CircleXButton from './CircleXButton';

export default function UploadedImage() {
  return (
    <Container>
      <img
        src="https://image.msscdn.net/images/goods_img/20210907/2113853/2113853_2_500.jpg?t=20220405141136"
        alt="신발"
      />
      <CircleXButton />
    </Container>
  );
}

const Container = styled.div`
  --size: 6rem;

  position: relative;
  background-color: ${colors.offWhite};
  width: var(--size);
  height: var(--size);
  border-radius: 8px;
  border: 1px solid ${colors.grey3};

  img {
    width: 100%;
    height: 100%;
  }

  button {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
  }
`;
