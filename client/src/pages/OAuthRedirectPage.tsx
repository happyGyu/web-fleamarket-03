import { useEffect } from 'react';
import styled from 'styled-components';

import useLogin from '@hooks/useLogin';

export default function OAuthRedirectPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get('code');
  const loginUrl = `/api/login?code=${code}`;
  const { login } = useLogin();

  useEffect(() => {
    login(loginUrl);
  }, [loginUrl]);

  return <LoadingSpinner>로딩중</LoadingSpinner>;
}

const LoadingSpinner = styled.div`
  position: fixed;
  top: calc(50vh - 2.5rem);
  left: calc(50vw - 2.5rem);
`;
