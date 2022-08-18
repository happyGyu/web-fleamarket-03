import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginAPIResponseDto } from '@customTypes/user';
import { IRegion } from '@customTypes/region';

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

      if (loginResponse.isExist) {
        setAccessTokenOnHeader(loginResponse.accessToken);
        navigate('/');
      } else {
        navigate('/signUp', { state: { ...loginResponse.user } });
      }
    } catch (e) {
      navigate('/error');
    }
  };

  return { login };
}
