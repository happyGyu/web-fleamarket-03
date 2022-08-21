import HeartIcon from '@assets/icons/HeartIcon';
import colors from '@constants/colors';
import { ILikedUser } from '@customTypes/product';
import { useState } from 'react';
import styled, { css } from 'styled-components';

interface LikeButtonProps {
  productId: number;
  likedUsers: ILikedUser[];
}

export default function LikeButton({ productId, likedUsers }: LikeButtonProps) {
  //   const [isUserPick, setIsUserPick] = useState(false);

  return (
    <LikeButtonWrapper isUserPick={false}>
      <HeartIcon />
    </LikeButtonWrapper>
  );
}

const LikeButtonWrapper = styled.button<{ isUserPick: boolean }>`
  svg {
    scale: 1.2;
    stroke-width: 2;
    stroke: ${colors.grey1};
    ${({ isUserPick }) =>
      isUserPick &&
      css`
        fill: ${colors.primary};
      `}
  }
`;
