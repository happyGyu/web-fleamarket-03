import NavigationBar from '@components/common/NavigationBar';
import PageContainer from '@components/common/PageContainer';
import {
  FormProvider,
  useFormInputMap,
  useFormValidationState,
  useFormValidatorMapAction,
} from '@components/CustomForm/FormProvider';
import Post from '@components/Post';
import RegionFooter from '@components/Post/RegionFooter';
import { SubmitButton } from '@components/Post/SubmitButton';
import { padding } from '@constants/padding';
import React from 'react';
import styled from 'styled-components';

export default function PostPage() {
  return (
    <FormProvider>
      <PostForm />
    </FormProvider>
  );
}

function PostForm() {
  const { formInputMap } = useFormInputMap();
  const { isAllValidated } = useFormValidationState();
  const { formValidatorMapAction } = useFormValidatorMapAction();

  return (
    <Form>
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
  padding-right: ${padding.pageSide};
  padding-left: ${padding.pageSide};
  width: 100%;
  height: 100%;
  background-color: white;
`;

const Form = styled.form`
  height: 100%;
`;
