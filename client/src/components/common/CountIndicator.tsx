import ChatIcon from '@assets/icons/ChatIcon';
import HeartIcon from '@assets/icons/HeartIcon';
import colors from '@constants/colors';
import mixin from '@style/mixin';
import styled from 'styled-components';
import { Text } from './Text';

type CountType = 'chat' | 'like';

interface CountIndicatorProps {
  type: CountType;
  count: number;
}

const iconMap = {
  chat: ChatIcon,
  like: HeartIcon,
};

export default function CountIndicator({ type, count }: CountIndicatorProps) {
  const Icon = iconMap[type];

  return (
    <CountIndicatorWrapper>
      <Icon />
      <Text color={colors.grey1}>{count}</Text>
    </CountIndicatorWrapper>
  );
}

const CountIndicatorWrapper = styled.div`
  ${mixin.flexMixin({ align: 'center' })}
  gap: 0.5rem;

  svg {
    stroke: ${colors.grey1};
  }
`;
