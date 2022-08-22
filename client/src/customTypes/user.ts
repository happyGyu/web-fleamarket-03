import { IOAuthUserInfo } from './auth';
import { IRegion } from './region';

export interface IUser {
  name: string;
  regions: IRegion[];
}

export interface LoginAPIResponseDto {
  isRegistered: boolean;
  oAuthInfo?: IOAuthUserInfo;
  accessToken?: string;
}

export interface CheckDuplicatedResponseDto {
  data: { isDuplicated: false };
}
