import { IOAuthUserInfo } from '@customTypes/auth';
import { CheckDuplicatedResponseDto, LoginAPIResponseDto } from '@customTypes/user';
import { makeQueryString } from '@utils/queryParser';
import axios from 'axios';

export const checkDuplicatedUser = async (nickname: string) => {
  const queryConfig = {
    nickname,
  };
  const queryString = makeQueryString(queryConfig);
  const response = await axios.get<CheckDuplicatedResponseDto>(`/user${queryString}`);
  return response.data.data;
};

interface SignUpRequestDto {
  name: string;
  regionId: number;
  oAuthInfo: IOAuthUserInfo;
}

export const requestSignUp = async ({ name, regionId, oAuthInfo }: SignUpRequestDto) => {
  await axios.post('/user/sign-up', {
    name,
    regionId,
    ...oAuthInfo,
  });
};

export const requestLogin = async (code: string, oAuthOrigin: string) => {
  const { data: loginResponse } = await axios.post<LoginAPIResponseDto>('/auth/login', {
    code,
    oAuthOrigin,
  });
  return loginResponse;
};

export const requestRelogin = async () => {
  const { data: reloginResponse } = await axios.get('/auth/relogin');
  return reloginResponse;
};
