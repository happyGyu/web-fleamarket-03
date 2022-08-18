import { BASE_URL } from '@constants/env';

export type OAuthOriginType = 'GITHUB' | 'NAVER';

enum AuthUrlEnum {
  GITHUB = 'https://github.com/login/oauth/authorize',
  NAVER = '',
}

export const redirectToAuthUrl = (oAuthOrigin: OAuthOriginType) => {
  const authUrl = AuthUrlEnum[oAuthOrigin];

  if (!process.env.REACT_APP_CLIENT_ID) {
    throw new Error('Cannot find client id');
  }

  const queryConfig = {
    scope: 'read:user',
    client_id: process.env.REACT_APP_CLIENT_ID,
    redirect_uri: `${BASE_URL}/oauth-redirect`,
  };

  const searchParamsObj = new URLSearchParams(queryConfig);
  const queryString = `?${searchParamsObj.toString()}`;

  const githubLoginUrl = authUrl + queryString;
  window.location.href = githubLoginUrl;
};
