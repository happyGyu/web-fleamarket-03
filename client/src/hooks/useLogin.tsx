import { useNavigate } from 'react-router-dom';
import { LoginAPIResponseDto } from '@customTypes/user';
import { useQuery } from '@tanstack/react-query';
import { requestLogin, requestResignToken } from '@apis/user';
import myAxios from '@apis/myAxios';

export default function useLogin() {
  const navigate = useNavigate();

  const setAccessTokenOnHeader = (accessToken: string) => {
    myAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  };

  const handleLoginResult = (loginResult: LoginAPIResponseDto, error: unknown) => {
    const { isRegistered, oAuthInfo, accessToken } = loginResult;
    if (!isRegistered) {
      navigate('/signUp', { state: { ...oAuthInfo } });
    }

    if (isRegistered && accessToken) {
      setAccessTokenOnHeader(accessToken);
      navigate('/');
    }

    if (error) {
      navigate('/error');
    }
  };

  const login = async (code: string, oAuthOrigin: string) => {
    const { data: loginResult, error } = useQuery<LoginAPIResponseDto>(['login'], () =>
      requestLogin(code, oAuthOrigin),
    );
    if (!loginResult) return;
    handleLoginResult(loginResult, error);
  };

  const relogin = async () => {
    const accessToken = await requestResignToken();
    setAccessTokenOnHeader(accessToken);
    navigate('/');
  };

  return { login, relogin };
}
