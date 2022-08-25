import HeartIcon from '@assets/icons/HeartIcon';
import colors from '@constants/colors';
import { ILikedUser } from '@customTypes/product';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useUser } from '@queries/useUser';
import useLikeButton from './useLikeButton';

interface LikeButtonProps {
  productId: number;
  likedUsers: ILikedUser[];
}
export default function LikeButton({ productId, likedUsers }: LikeButtonProps) {
  const user = useUser();
  const isUserPick = likedUsers.some((likedUser) => likedUser.userId === user.id);
  const [isFilled, setIsFilled] = useState(isUserPick);

  const mutateLikeButton = useLikeButton({
    productId,
    toggleLikeView: () => setIsFilled((prev) => !prev),
  });

  const handleLikeButtonClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    mutateLikeButton();
  };

  return (
    <LikeButtonWrapper isFilled={isFilled} onClick={handleLikeButtonClick}>
      <HeartIcon />
    </LikeButtonWrapper>
  );
}

const LikeButtonWrapper = styled.button<{ isFilled: boolean }>`
  svg {
    scale: 1.2;
    stroke-width: 2;
    stroke: ${colors.grey1};
    ${({ isFilled }) =>
      isFilled &&
      css`
        fill: ${colors.primary};
      `}
  }
`;
