import { Text } from '@components/common/Text';
import colors from '@constants/colors';
import mixin from '@style/mixin';
import styled from 'styled-components';

export default function CategorySelector() {
  const categories = ['여성패션 잡화', '기타 물품', '가구 인테리어', '기타', 'it물품'];

  return (
    <Container>
      <Text size="xSmall">(필수) 카테고리를 선택해주세요</Text>
      <CategoriesContainer>
        {categories.map((category) => (
          <ItemWrapper>
            <Text size="small">{category}</Text>
          </ItemWrapper>
        ))}
      </CategoriesContainer>
    </Container>
  );
}

const Container = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid ${colors.grey3};
  color: ${colors.grey1};
  width: 100%;
  overflow-x: hidden;
  ${Text} {
    color: ${colors.grey1};
  }
`;
const ItemWrapper = styled.div`
  padding: 4px 16px;
  border: 1px solid ${colors.grey3};
  border-radius: 999px;
  white-space: nowrap;
`;
const CategoriesContainer = styled.div`
  margin-top: 0.8rem;
  ${mixin.flexMixin({ align: 'center' })};
  gap: 4px;
`;
