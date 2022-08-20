import colors from '@constants/colors';
import styled from 'styled-components';

type TextSizeType = 'large' | 'medium' | 'small' | 'xSmall';
type FontWeightType = 'bolder' | 'bold' | 'medium';

const textSizeMap = {
  large: '1.4rem',
  medium: '1.2rem',
  small: '1rem',
  xSmall: '0.8rem',
};

const fontWeightMap = {
  bolder: '700',
  bold: '500',
  medium: '400',
};

export const Text = styled.span<{ size?: TextSizeType; fontWeight?: FontWeightType }>`
  color: ${colors.black};
  font-size: ${({ size }) => (size ? textSizeMap[size] : textSizeMap.medium)};
  font-weight: ${({ fontWeight }) =>
    fontWeight ? fontWeightMap[fontWeight] : fontWeightMap.medium};
`;
