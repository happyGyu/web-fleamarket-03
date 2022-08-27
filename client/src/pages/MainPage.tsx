import { getRegionProducts } from '@apis/product';
import CircleButton from '@components/common/CircleButton';
import MainPageNavigationBar from '@components/MainPageNavigationBar';
import { IProductItem } from '@customTypes/product';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import portalUtil from '@utils/portal';
import ProductItemList from '@components/ProductItemList';
import { useUser } from '../queries/useUser';

export default function MainPage() {
  const { user } = useUser();
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
      <ProductItemList
        products={data}
        utilButtonInfo={{ type: 'like' }}
        scrollTriger={<Trigger />}
      />
      <Portal>
        <RegisterNewProductLink to="/product/post">
          <CircleButton />
        </RegisterNewProductLink>
      </Portal>
    </>
  );
}

const RegisterNewProductLink = styled(Link)`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;
