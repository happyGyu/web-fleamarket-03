import axios from 'axios';

export default function useLogin() {
  const setAccessTokenOnHeader = (accessToken: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  };

  const login = async (code: string, oAuthOrigin: string) => {
    const result = await axios.post('/api/login', { code, oAuthOrigin });
    const accessToken = result.headers['access-token'];
    console.log(result);
    setAccessTokenOnHeader(accessToken);
  };

  return { login };
}
