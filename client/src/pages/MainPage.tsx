import { getRegionProducts } from '@apis/product';
import { getUser } from '@apis/user';
import CircleButton from '@components/common/CircleButton';
import LikeButton from '@components/common/LikeButton';
import LoadingIndicator from '@components/common/LoadingIndicator';
import PageContainer from '@components/common/PageContainer';
import MainPageNavigationBar from '@components/MainPageNavigationBar';
import ProductItem from '@components/ProductItem';
import colors from '@constants/colors';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

export default function MainPage() {
  const { data: user, isLoading: userLoading } = useQuery(['user'], getUser);
  const { data: productInfos, isLoading: productLoading } = useQuery(
    ['products'],
    () => getRegionProducts(user?.regions[0].regionId),
    {
      enabled: !!user?.regions[0].regionId,
    },
  );

  if (userLoading || productLoading) {
    return <LoadingIndicator />;
  }
  return (
    <>
      <MainPageNavigationBar />
      <MainPageWrapper>
        {productInfos?.map((productInfo) => (
          <ProductItem
            key={productInfo.id}
            productInfo={productInfo}
            UtilButton={
              <LikeButton productId={productInfo.id} likedUsers={productInfo.likedUsers} />
            }
          />
        ))}
        <RegisterNewProductButtonWrapper>
          <CircleButton />
        </RegisterNewProductButtonWrapper>
      </MainPageWrapper>
    </>
  );
}

const MainPageWrapper = styled(PageContainer)`
  background-color: ${colors.white};
  height: 100%;
`;

const RegisterNewProductButtonWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;
