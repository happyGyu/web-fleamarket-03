import axios from 'axios';

export default function useLogin() {
  const setAccessTokenOnHeader = (accessToken: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  };

  const login = async (code: string, oAuthOrigin: string) => {
    const loginUrl = `${process.env.REACT_APP_SERVER_URL}/login`
    const result = await axios.post(loginUrl, { code, oAuthOrigin });
    const accessToken = result.headers['access-token'];
    setAccessTokenOnHeader(accessToken);
  };

  return { login };
}
