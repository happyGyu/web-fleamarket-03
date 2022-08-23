import { toggleLike } from '@apis/product';
import { getUser } from '@apis/user';
import HeartIcon from '@assets/icons/HeartIcon';
import colors from '@constants/colors';
import { ILikedUser } from '@customTypes/product';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

interface LikeButtonProps {
  productId: number;
  likedUsers: ILikedUser[];
}
export default function LikeButton({ productId, likedUsers }: LikeButtonProps) {
  const { data: user } = useQuery(['user'], getUser);
  const [isUserPick, setIsUserPick] = useState(false);

  useEffect(() => {
    setIsUserPick(isUserInLikerList(user?.id));
  }, [user]);

  const isUserInLikerList = (userId?: number) => {
    if (!userId) return false;
    const likerList = likedUsers.map((likedUser) => likedUser.userId);
    return likerList.includes(userId);
  };

  const handleLikeButtonClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      await toggleLike(productId);
      setIsUserPick((prev) => !prev);
    } catch (e) {
      alert('정상처리되지 않았습니다.');
    }
  };

  return (
    <LikeButtonWrapper isUserPick={isUserPick} onClick={handleLikeButtonClick}>
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
