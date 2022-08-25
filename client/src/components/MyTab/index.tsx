import colors from '@constants/colors';
import { componentSize } from '@constants/componentSize';
import mixin from '@style/mixin';
import { useState } from 'react';
import styled from 'styled-components';

export default function MyTab() {
  const tabInfos = [
    { id: 1, name: '판매목록', component: <div>상품목록입니다.</div> },
    { id: 2, name: '채팅목록', component: <div>채팅목록입니다.</div> },
    { id: 3, name: '관심목록', component: <div>관심목록입니다.</div> },
  ];

  const [selectedTabId, setSelectedTabId] = useState(1);
  const SelectedTabComponent = tabInfos.find(({ id }) => id === selectedTabId)?.component;

  return (
    <Container>
      <TabHeader>
        {tabInfos.map(({ name, id }) => (
          <TabHeaderItem isActive={selectedTabId === id} onClick={() => setSelectedTabId(id)}>
            {name}
          </TabHeaderItem>
        ))}
      </TabHeader>
      <TabContent>{SelectedTabComponent && SelectedTabComponent}</TabContent>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  ${mixin.flexMixin({ direction: 'column' })}
`;

const TabHeader = styled.nav<{ backgroundColor?: string; shadowColor?: string }>`
  margin-top: ${componentSize.navigationHeader.height};
  ${mixin.flexMixin({ justify: 'center', align: 'center' })}
  width: 100%;
  height: 48px;
  padding: 0 1.5rem;
  background-color: ${({ backgroundColor }) => backgroundColor || colors.offWhite};
  box-shadow: inset 0px -1px 0px ${({ shadowColor }) => shadowColor || colors.grey3};
  gap: 10px;
`;

const TabHeaderItem = styled.div<{ isActive?: boolean }>`
  width: 30%;
  padding: 1rem 0;
  text-align: center;
  position: relative;
  color: ${({ isActive }) => (isActive ? colors.primary : colors.black)};
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${({ isActive }) => (isActive ? colors.primary : 'transparent')};
  }
`;

const TabContent = styled.div`
  height: 100%;
  width: 100%;
`;
