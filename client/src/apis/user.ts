import { IOAuthUserInfo } from '@customTypes/auth';
import { IRegion } from '@customTypes/region';
import { CheckDuplicatedResponseDto, LoginAPIResponseDto } from '@customTypes/user';
import { makeQueryString } from '@utils/queryParser';
import axios from 'axios';
import myAxios from './myAxios';

export const checkDuplicatedUser = async (nickname: string) => {
  const queryConfig = {
    nickname,
  };
  const queryString = makeQueryString(queryConfig);
  const response = await myAxios.get<CheckDuplicatedResponseDto>(`/user${queryString}`);
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
  const { data: loginResponse } = await myAxios.post<LoginAPIResponseDto>('/auth/login', {
    code,
    oAuthOrigin,
  });
  return loginResponse;
};

export const requestResignToken = async () => {
  const { data: accessToken } = await axios.get<string>('/auth/resign');
  return accessToken;
};

interface ILoginUserRegion {
  regionId: number;
  userId: number;
  region: IRegion;
}

interface GetLoginUserApiDto {
  id: number;
  name: string;
  regions: ILoginUserRegion[];
}

export const getUser = async () => {
  const { data: user } = await myAxios.get<GetLoginUserApiDto>('/auth/user');
  return user;
};
