import { useEffect } from 'react';
import styled from 'styled-components';

import useLogin from '@hooks/useLogin';

export default function OAuthRedirectPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get('code');
  const oAuthOrigin = searchParams.get('origin');
  const { login } = useLogin();
  if (!code || !oAuthOrigin) {
    throw new Error('유효하지 않은 리다이렉션입니다');
  }

  useEffect(() => {
    login(code, oAuthOrigin);
  }, []);

  return <LoadingSpinner>로딩중</LoadingSpinner>;
}

const LoadingSpinner = styled.div`
  position: fixed;
  top: calc(50vh - 2.5rem);
  left: calc(50vw - 2.5rem);
`;
