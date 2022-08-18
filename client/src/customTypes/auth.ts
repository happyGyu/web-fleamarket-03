export type OAuthOriginType = 'GITHUB';

export enum OAuthBaseUrlEnum {
  GITHUB = 'https://github.com/login/oauth/authorize',
}

export interface OAuthUserInfo {
  oAuthOrigin: OAuthOriginType;
  oAuthId: string;
}
