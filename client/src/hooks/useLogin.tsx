import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginAPIResponseDto } from '@customTypes/user';

export default function useLogin() {
  const navigate = useNavigate();

  const setAccessTokenOnHeader = (accessToken: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  };

  const login = async (code: string, targetOAuthOrigin: string) => {
    try {
      const { data: loginResponse } = await axios.post<LoginAPIResponseDto>('/login', {
        code,
        targetOAuthOrigin,
      });

      if (loginResponse.isRegistered) {
        setAccessTokenOnHeader(loginResponse.accessToken);
        navigate('/');
      } else {
        navigate('/signUp', { state: { ...loginResponse.oAuthInfo } });
      }
    } catch (e) {
      navigate('/error');
    }
  };

  return { login };
}
