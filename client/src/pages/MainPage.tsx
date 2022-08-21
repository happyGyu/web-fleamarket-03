import { getRegionProducts } from '@apis/product';
import CircleButton from '@components/common/CircleButton';
import LikeButton from '@components/common/LikeButton';
import PageContainer from '@components/common/PageContainer';
import MainPageNavigationBar from '@components/MainPageNavigationBar';
import ProductItem from '@components/ProductItem';
import colors from '@constants/colors';
import { IProductItem } from '@customTypes/product';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function MainPage() {
  const [productInfos, setProductInfos] = useState<IProductItem[]>([]);

  useEffect(() => {
    (async () => {
      const result = await getRegionProducts(3);
      setProductInfos((prev) => [...prev, ...result]);
    })();
  }, []);

  return (
    <>
      <MainPageNavigationBar />
      <MainPageWrapper>
        {productInfos.map((productInfo) => (
          <ProductItem
            key={productInfo.id}
            productInfo={productInfo}
            UtilButton={LikeButton({
              productId: productInfo.id,
              likedUsers: productInfo.likedUsers,
            })}
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
