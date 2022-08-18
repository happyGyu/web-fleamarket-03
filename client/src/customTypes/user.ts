import { OAuthOriginType } from './auth';
import { IRegion } from './region';

export interface IUser {
  name: string;
  oAuthId: string;
  oAuthOrigin: OAuthOriginType;
  regions: IRegion[];
}

export interface LoginAPIResponseDto {
  isExist: boolean;
  user: IUser;
  accessToken: string;
}
