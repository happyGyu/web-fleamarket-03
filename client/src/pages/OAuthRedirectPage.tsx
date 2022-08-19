import { useEffect } from 'react';
import useLogin from '@hooks/useLogin';
import { getQueryValue } from '@utils/queryParser';
import LoadingIndicator from '@components/common/LoadingIndicator';

export default function OAuthRedirectPage() {
  const { login } = useLogin();

  const code = getQueryValue('code');
  const oAuthOrigin = getQueryValue('origin');

  if (!code || !oAuthOrigin) {
    throw new Error('유효하지 않은 리다이렉션입니다');
  }

  useEffect(() => {
    login(code, oAuthOrigin);
  }, []);

  return <LoadingIndicator />;
}
