import { getRegionProducts } from '@apis/product';
import CircleButton from '@components/common/CircleButton';
import LikeButton from '@components/LikeButton';
import MainPageNavigationBar from '@components/MainPageNavigationBar';
import ProductItem from '@components/ProductItem';
import colors from '@constants/colors';
import { IProductItem } from '@customTypes/product';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import portalUtil from '@utils/portal';
import { padding } from '@constants/padding';
import { useUser } from '../queries/useUser';

export default function MainPage() {
  const user = useUser();
  const primaryRegion = user.regions.find((region) => region.isPrimary) || user.regions[0];
  const queryKey = ['products', primaryRegion.id];
  const { data, Trigger } = useInfiniteScroll<IProductItem>({
    queryKey,
    fetchFunction: (pageParam?: number) =>
      getRegionProducts({ regionId: primaryRegion.id, start: pageParam }),
  });
  const Portal = portalUtil.openPortal();

  return (
    <>
      <MainPageNavigationBar />
      <MainPageWrapper>
        {data?.pages.map((page) =>
          page.data.map((product) => (
            <ProductItem
              key={product.id}
              productId={product.id}
              UtilButton={<LikeButton productId={product.id} />}
            />
          )),
        )}
        <Trigger />
      </MainPageWrapper>
      <Portal>
        <RegisterNewProductLink to="/post">
          <CircleButton />
        </RegisterNewProductLink>
      </Portal>
    </>
  );
}

const MainPageWrapper = styled.div`
  padding-top: ${padding.pageTop};
  background-color: ${colors.white};
  height: 100%;
  overflow-y: auto;
`;

const RegisterNewProductLink = styled(Link)`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;
