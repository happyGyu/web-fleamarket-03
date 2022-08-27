import { createProduct } from '@apis/product';
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
import { CreateProductAPIDto } from '@customTypes/product';
import { useUser } from '@queries/useUser';
import { getNumber } from '@utils/format';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function PostPage() {
  return (
    <FormProvider>
      <PostForm />
    </FormProvider>
  );
}

function PostForm() {
  const { user } = useUser();

  const { formInputMap } = useFormInputMap();
  const { isAllValidated } = useFormValidationState();

  const navigate = useNavigate();
  const registerProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAllValidated) {
      alert('값을 확인해주세요!');
      return;
    }

    const product = {
      ...formInputMap,
      price: Number(getNumber(formInputMap.price)),
      regionId: user.regions[0].id,
    } as CreateProductAPIDto;

    try {
      await createProduct(product);
      navigate('/');
    } catch (error) {
      navigate('error');
    }
  };

  return (
    <Form onSubmit={registerProduct}>
      <NavigationBar title="글쓰기" actionItem={<SubmitButton />} />
      <PostPageWrapper>
        <Post />
        <RegionFooter />
      </PostPageWrapper>
    </Form>
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
