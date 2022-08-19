import { IOAuthUserInfo } from './auth';
import { IRegion } from './region';

export interface IUser {
  name: string;
  regions: IRegion[];
}

export interface LoginAPIResponseDto {
  isRegistered: boolean;
  user: IUser;
  oAuthInfo: IOAuthUserInfo;
  accessToken: string;
}
