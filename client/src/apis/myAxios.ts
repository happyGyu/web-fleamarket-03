import { SERVER_URL } from '@constants/env';
import axios from 'axios';

const myAxios = axios.create({
  withCredentials: true,
  baseURL: SERVER_URL,
});

myAxios.interceptors.response.use(
  (response) => response,

  async (error) => {
    const {
      response: { status },
      config: originalRequest,
    } = error;

    if (status === 401) {
      try {
        await reissueTokenAndRetryRequest(originalRequest);
      } catch (e) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

async function reissueTokenAndRetryRequest(originalRequest: any) {
  const { data: accessToken } = await axios.get('/auth/resign');
  myAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  return myAxios(originalRequest);
}

export default myAxios;
