import colors from '@constants/colors';
import styled from 'styled-components';

const thumbnailSizeMap = {
  medium: '8rem',
  small: '2.5rem',
};

type ThumbnailSizeType = 'medium' | 'small';

const Thumbnail = styled.img<{ size: ThumbnailSizeType }>`
  width: ${({ size }) => thumbnailSizeMap[size]};
  height: ${({ size }) => thumbnailSizeMap[size]};
  border-radius: 1rem;
  border: 1px solid ${colors.grey3};
`;

export default Thumbnail;
