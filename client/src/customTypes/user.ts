import { OAuthUserInfo } from './auth';
import { IRegion } from './region';

export interface IUser extends OAuthUserInfo {
  name: string;
  regions: IRegion[];
}

export interface LoginAPIResponseDto {
  isExist: boolean;
  user: IUser;
  accessToken: string;
}
