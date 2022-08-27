import { getRegionProducts } from '@apis/product';
import NavigationBar from '@components/common/NavigationBar';
import ProductItem from '@components/ProductItemList/ProductItem';
import colors from '@constants/colors';
import { padding } from '@constants/padding';
import { IProductItem } from '@customTypes/product';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { useUser } from '@queries/useUser';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

interface pageState {
  categoryName: string;
}

export default function CategoryProductPage() {
  const { categoryId } = useParams();
  const location = useLocation();
  const pageState = location.state as pageState;

  const { user } = useUser();
  const primaryRegion = user.regions.find((region) => region.isPrimary) || user.regions[0];
  const queryKey = ['products', primaryRegion.id, Number(categoryId)];
  const { data, Trigger } = useInfiniteScroll<IProductItem>({
    queryKey,
    fetchFunction: (pageParam?: number) =>
      getRegionProducts({
        regionId: primaryRegion.id,
        categoryId: Number(categoryId),
        start: pageParam,
      }),
  });

  return (
    <>
      <NavigationBar title={pageState.categoryName} />
      <MainPageWrapper>
        {data?.pages.map((page) =>
          page.data.map((product) => (
            <ProductItem
              key={product.id}
              productId={product.id}
              utilButtonInfo={{ type: 'like' }}
            />
          )),
        )}
        <Trigger />
      </MainPageWrapper>
    </>
  );
}

const MainPageWrapper = styled.div`
  padding-top: ${padding.pageTop};
  background-color: ${colors.white};
  height: 100%;
  overflow-y: auto;
`;
