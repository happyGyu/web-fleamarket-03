import styled from 'styled-components';

interface ImageSliderProps {
  images: string[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const primaryImage = images[0];
  return (
    <Container imgSrc={primaryImage}>
      <img src={primaryImage} alt="대표이미지" />
    </Container>
  );
}

const Container = styled.div<{ imgSrc: string }>`
  width: 26rem;
  height: 26rem;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.24) 0%,
    rgba(0, 0, 0, 0) 16.52%,
    rgba(0, 0, 0, 0) 87.36%,
    rgba(0, 0, 0, 0.24) 100%
  );

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
