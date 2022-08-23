import styled from 'styled-components';

interface ImageSliderProps {
  images: string[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  return <Container />;
}

const Container = styled.div`
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.24) 0%,
    rgba(0, 0, 0, 0) 16.52%,
    rgba(0, 0, 0, 0) 87.36%,
    rgba(0, 0, 0, 0.24) 100%
  );
  width: 26rem;
  height: 26rem;
`;
