import colors from '@constants/colors';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '@components/common/Text';
import ChevronLeft from '@assets/icons/ChevronLeft';
import mixin from '@style/mixin';

interface NavigationBarProps {
  title: string;
  navigationButtonHandler?: () => void;
  actionItem?: React.ReactNode;
}

export default function NavigationBar({
  title,
  navigationButtonHandler,
  actionItem,
}: NavigationBarProps) {
  const navigate = useNavigate();

  const defaultNavigationHandler = () => {
    navigate(-1);
  };
  return (
    <Contianer>
      <NavigationButton onClick={navigationButtonHandler || defaultNavigationHandler}>
        <ChevronLeft />
      </NavigationButton>
      <Text>{title}</Text>
      <ActionItemContainer>{actionItem}</ActionItemContainer>
    </Contianer>
  );
}

const Contianer = styled.div`
  position: absolute;
  top: 0;
  ${mixin.flexMixin({ justify: 'center', align: 'center' })}
  width: 100%;
  height: 3.5rem;
  padding: 1rem 1.5rem;
  background-color: ${colors.offWhite};
  border-bottom: 2px solid ${colors.grey1};
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 1.25rem;
  left: 1.5rem;

  svg {
    width: 0.5rem;
    height: 1rem;
  }
`;

const ActionItemContainer = styled.div`
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
`;