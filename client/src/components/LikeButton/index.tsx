import { toggleLike } from '@apis/product';
import HeartIcon from '@assets/icons/HeartIcon';
import colors from '@constants/colors';
import { ILikedUser } from '@customTypes/product';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useUser } from '@queries/useUser';
import useLikeButton from './useLikeButton';

interface IInfiniteProductIdx {
  pageIdx: number;
  productIdx: number;
}

interface LikeButtonProps {
  productId: number;
  likedUsers: ILikedUser[];
  idx: IInfiniteProductIdx;
}
export default function LikeButton({ productId, likedUsers, idx }: LikeButtonProps) {
  const user = useUser();
  const likeButtonmutator = useLikeButton(productId, idx, user.id);

  const checkUserPick = (userId: number) =>
    likedUsers.some((likedUser) => likedUser.userId === userId);

  const handleLikeButtonClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    likeButtonmutator();
  };

  return (
    <LikeButtonWrapper isUserPick={checkUserPick(user.id)} onClick={handleLikeButtonClick}>
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
