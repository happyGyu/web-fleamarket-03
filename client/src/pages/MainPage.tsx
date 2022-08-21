import PageContainer from '@components/common/PageContainer';
import MainPageNavigationBar from '@components/MainPageNavigationBar';
import ProductItem from '@components/ProductItem';
import colors from '@constants/colors';
import { GetRegionProductAPIDto } from '@customTypes/product';
import styled from 'styled-components';

const mockData: GetRegionProductAPIDto[] = [
  {
    id: 1,
    name: '테스트 상품',
    price: 5000,
    region: {
      id: 3,
      address: '서울시 노원구 하계동',
    },
    salesStatus: 'sale',
    createdAt: '2022-08-20T09:51:48.714Z',
    thumbnail: 'https://src.hidoc.co.kr/image/lib/2021/9/17/1631863503853_0.jpg',
    likeCount: 2,
  },
];

export default function MainPage() {
  return (
    <>
      <MainPageNavigationBar />
      <MainPageWrapper>
        {mockData.map((data) => (
          <ProductItem key={data.id} productInfo={data} />
        ))}
      </MainPageWrapper>
    </>
  );
}

const MainPageWrapper = styled(PageContainer)`
  background-color: ${colors.white};
  height: 100%;
`;
