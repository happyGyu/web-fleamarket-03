import AnimatedComponent from '@hooks/animation/AnimationComponent';
import { useNavigationType } from 'react-router-dom';
import styled from 'styled-components';
import React from 'react';

interface AnimationPageProps {
  children: React.ReactNode;
  depth?: number;
}

interface TransitionPageProps {
  depth?: number;
  children: React.ReactNode;
}

export default function TransitionPage({ depth = 0, children }: TransitionPageProps) {
  return <AnimatedPage depth={depth}>{children}</AnimatedPage>;
}

function AnimatedPage({ children, depth }: AnimationPageProps) {
  const navigationType = useNavigationType();
  const hasMountAnimation = navigationType !== 'POP';
  const hasUnmountAnimation = navigationType === 'POP';

  return (
    <StyledAnimatedDiv
      style={{ zIndex: depth }}
      onEnter={
        hasMountAnimation ? [{ transform: 'translateX(100%)' }, { transform: 'translate(0%)' }] : []
      }
      onExit={
        hasUnmountAnimation
          ? [{ transform: 'translateX(0%)' }, { transform: 'translate(100%)' }]
          : []
      }
    >
      {children}
    </StyledAnimatedDiv>
  );
}

const AnimatedDiv = AnimatedComponent('div');
const StyledAnimatedDiv = styled(AnimatedDiv)`
  position: absolute;
  background-color: white;
  width: 100%;
  top: 0;
  overflow-y: hidden;
  height: 100%;
`;
