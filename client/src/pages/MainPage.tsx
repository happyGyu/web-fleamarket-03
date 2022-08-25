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
import LoadingIndicator from '@components/common/LoadingIndicator';
import { useUser } from '../queries/useUser';

export default function MainPage() {
  const user = useUser();
  const primaryRegion = user.regions[0];
  const { data, Trigger } = useInfiniteScroll<GetRegionProductDto>({
    queryKey: ['products', primaryRegion.id],
    fetchFunction: (pageParam?: number) =>
      getRegionProducts({ regionId: primaryRegion.id, start: pageParam }),
  });

  return user.id > 0 ? (
    <>
      <MainPageNavigationBar />
      <MainPageWrapper>
        {data?.pages.map((page, pageIdx) =>
          page.products.map((productInfo, productIdx) => (
            <ProductItem
              key={productInfo.id}
              productInfo={productInfo}
              UtilButton={
                <LikeButton
                  productId={productInfo.id}
                  likedUsers={productInfo.likedUsers}
                  idx={{ pageIdx, productIdx }}
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
  ) : (
    <LoadingIndicator />
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
