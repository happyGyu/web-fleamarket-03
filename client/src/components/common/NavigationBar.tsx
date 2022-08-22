import colors from '@constants/colors';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '@components/common/Text';
import ChevronLeft from '@assets/icons/ChevronLeft';
import mixin from '@style/mixin';
import { componentSize } from '@constants/componentSize';

interface NavigationBarProps {
  title?: string;
  navigationButtonHandler?: () => void;
  actionItem?: React.ReactNode;
  color?: string;
  shadowColor?: string;
}

export default function NavigationBar({
  title,
  navigationButtonHandler,
  actionItem,
  color,
  shadowColor,
}: NavigationBarProps) {
  const navigate = useNavigate();

  const defaultNavigationHandler = () => {
    navigate(-1);
  };
  return (
    <Container shadowColor={shadowColor}>
      <NavigationButton onClick={navigationButtonHandler || defaultNavigationHandler} color={color}>
        <ChevronLeft />
      </NavigationButton>
      <Text color={color}>{title}</Text>
      <ActionItemContainer>{actionItem}</ActionItemContainer>
    </Container>
  );
}

const Container = styled.div<{ shadowColor?: string }>`
  position: absolute;
  z-index: 10;
  top: 0;
  ${mixin.flexMixin({ justify: 'center', align: 'center' })}
  width: 100%;
  height: ${componentSize.navigationHeader.height};
  padding: 1rem 1.5rem;
  background-color: ${colors.offWhite};
  box-shadow: inset 0px -1px 0px ${({ shadowColor }) => shadowColor || colors.grey3};
`;

const NavigationButton = styled.button<{ color?: string }>`
  position: absolute;
  top: 1.25rem;
  left: 1.5rem;

  svg {
    width: 0.5rem;
    height: 1rem;
    stroke: ${({ color }) => color || colors.black};
  }
`;

const ActionItemContainer = styled.div`
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
`;
