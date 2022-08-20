import colors from '@constants/colors';
import styled from 'styled-components';

interface BasicButtonProps {
  width?: string;
  height?: string;
  text: string;
  onClick: () => void;
}

export default function BasicButton({ width, height, text, onClick }: BasicButtonProps) {
  return (
    <BasicButtonWrapper width={width} height={height} onClick={onClick}>
      {text}
    </BasicButtonWrapper>
  );
}

const BasicButtonWrapper = styled.button<{ width?: string; height?: string }>`
  padding: 0.625rem 1rem;
  background-color: ${colors.primary};
  color: ${colors.offWhite};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '2.625rem'};
  border-radius: 0.5rem;
`;
