import { getRegionProducts } from '@apis/product';
import CircleButton from '@components/common/CircleButton';
import LikeButton from '@components/LikeButton';
import PageContainer from '@components/common/PageContainer';
import MainPageNavigationBar from '@components/MainPageNavigationBar';
import ProductItem from '@components/ProductItem';
import colors from '@constants/colors';
import { GetRegionProductDto } from '@customTypes/product';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../queries/useUser';

export default function MainPage() {
  const user = useUser();
  const primaryRegion = user.regions[0];
  const queryKey = ['products', primaryRegion.id];
  const { data, Trigger } = useInfiniteScroll<GetRegionProductDto>({
    queryKey,
    fetchFunction: (pageParam?: number) =>
      getRegionProducts({ regionId: primaryRegion.id, start: pageParam }),
  });

  return (
    <>
      <MainPageNavigationBar />
      <MainPageWrapper>
        {data?.pages.map((page) =>
          page.products.map((productInfo) => (
            <ProductItem
              key={productInfo.id}
              productInfo={productInfo}
              UtilButton={
                <LikeButton
                  queryKey={queryKey}
                  productId={productInfo.id}
                  likedUsers={productInfo.likedUsers}
                />
              }
            />
          )),
        )}
        <Trigger />
        <RegisterNewProductLink to="/post">
          <CircleButton />
        </RegisterNewProductLink>
      </MainPageWrapper>
    </>
  );
}

const MainPageWrapper = styled(PageContainer)`
  background-color: ${colors.white};
  height: 100%;
`;

const RegisterNewProductLink = styled(Link)`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;
