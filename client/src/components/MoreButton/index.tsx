import MoreIcon from '@assets/icons/MoreIcon';
import DropDown from '@components/common/DropDown';
import colors from '@constants/colors';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

interface MoreButtonProps {
  color?: string;
}

export default function MoreButton({ color }: MoreButtonProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { productId } = useParams();
  const navigate = useNavigate();
  const moreUtils = [
    {
      name: '수정하기',
      onClick: () => navigate(`/product/edit/${productId}`),
    },
    {
      name: '삭제하기',
      onClick: () => alert('삭제하기'),
      color: colors.red,
    },
  ];
  return (
    <Container color={color} onClick={() => setIsDropDownOpen((prev) => !prev)}>
      <MoreIcon />
      {isDropDownOpen && <DropDown dropDownItems={moreUtils} top="2rem" right="0" />}
    </Container>
  );
}

const Container = styled.button<{ color?: string }>`
  svg {
    width: 1.5rem;
    height: 1.5rem;
    stroke: ${({ color }) => color};
  }
`;
