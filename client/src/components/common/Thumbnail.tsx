import styled from 'styled-components';

const thumbnailSizeMap = {
  medium: '7rem',
  small: '2.5rem',
};

type ThumbnailSizeType = 'medium' | 'small';

const Thumbnail = styled.img<{ size: ThumbnailSizeType }>`
  width: ${({ size }) => thumbnailSizeMap[size]};
  height: ${({ size }) => thumbnailSizeMap[size]};
  border-radius: 0.5rem;
  border: 1px solid black;
`;

export default Thumbnail;
