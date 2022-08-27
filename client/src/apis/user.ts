import { IOAuthUserInfo } from '@customTypes/auth';
import { IRegion } from '@customTypes/region';
import { CheckDuplicatedResponseDto, IUser, LoginResponseDto } from '@customTypes/user';
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
  const { data: loginResponse } = await myAxios.post<LoginResponseDto>('/auth/login', {
    code,
    oAuthOrigin,
  });
  return loginResponse;
};

export const requestLogout = async () => {
  const { data: logoutResponse } = await myAxios.post('/auth/logout');
  return logoutResponse;
};

export const requestResignToken = async () => {
  const { data: accessToken } = await axios.get<string>('/auth/resign');
  return accessToken;
};

export const requestUser = async () => {
  const { data: user } = await myAxios.get<IUser>('/auth/user');
  return user;
};

export const requestCreateUserRegion = async (region: IRegion) => {
  const { data } = await myAxios.post(`/user/region`, { ...region, regionId: region.id });
  return data;
};

export const requestChangePrimaryRegion = async (region: IRegion) => {
  const { id } = region;
  const { data } = await myAxios.patch(`/user/region/${id}`);
  return data;
};

export const requestDeleteRegion = async (region: IRegion) => {
  const { id } = region;
  const { data } = await myAxios.delete(`/user/region/${id}`);
  return data;
};
