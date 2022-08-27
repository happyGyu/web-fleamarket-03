import { updateProduct } from '@apis/product';
import NavigationBar from '@components/common/NavigationBar';
import PageContainer from '@components/common/PageContainer';
import {
  FormProvider,
  useFormInputMap,
  useFormValidationState,
} from '@components/CustomForm/FormProvider';
import Post from '@components/Post';
import RegionFooter from '@components/Post/RegionFooter';
import { SubmitButton } from '@components/Post/SubmitButton';
import TransitionPage from '@components/TransitionPage';
import { CreateProductAPIDto } from '@customTypes/product';
import useProduct from '@queries/useProduct';
import { useUser } from '@queries/useUser';
import { getNumber } from '@utils/format';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

export default function ProductEditPage() {
  return (
    <FormProvider>
      <PostEditForm />
    </FormProvider>
  );
}

function PostEditForm() {
  const { user } = useUser();
  const { productId } = useParams();
  const { getProduct } = useProduct();
  const { data: product } = getProduct(Number(productId));
  const { formInputMap } = useFormInputMap();
  const { isAllValidated } = useFormValidationState();

  const navigate = useNavigate();

  const registerProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAllValidated) {
      alert('값을 확인해주세요!');
      return;
    }

    const editedProduct = {
      ...formInputMap,
      price: Number(getNumber(formInputMap.price)),
      // region primary구현해야함
      regionId: user.regions[0].id,
    } as CreateProductAPIDto;

    try {
      await updateProduct(editedProduct, Number(productId));
      navigate('/');
    } catch (error) {
      navigate('error');
    }
  };

  if (!product) {
    return <div />;
  }

  return (
    <TransitionPage depth={2}>
      <Form onSubmit={registerProduct}>
        <NavigationBar title="글쓰기" actionItem={<SubmitButton />} />
        <PostPageWrapper>
          <Post product={product} />
          <RegionFooter />
        </PostPageWrapper>
      </Form>
    </TransitionPage>
  );
}

const PostPageWrapper = styled(PageContainer)`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;
`;

const Form = styled.form`
  height: 100%;
`;
