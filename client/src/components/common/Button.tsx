import colors from '@constants/colors';
import styled from 'styled-components';

const buttonSizeMap = {
  medium: {
    width: 111,
    height: 111,
  },
  large: {
    width: 111,
    height: 111,
  },
};

type ButtonSizeType = 'medium' | 'large';

const Button = styled.button<{ size: ButtonSizeType }>`
  width: ${({ size }) => buttonSizeMap[size].width};
  height: ${({ size }) => buttonSizeMap[size].height};
  color: ${colors.offWhite};
  background-color: ${colors.primary};

  :hover {
    background-color: ${colors.tertiary};
  }

  :disabled {
    background-color: ${colors.secondary};
  }

  :focus {
    border: 1px solid ${colors.tertiary};
  }
`;

export default Button;
