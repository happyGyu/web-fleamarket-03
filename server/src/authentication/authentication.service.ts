import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserService } from 'src/user/user.service';
import { IAccessTokenInfo } from './types';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UserService) {}
  async loginWithOAuth({
    oAuthOrigin,
    code,
  }: {
    oAuthOrigin: string;
    code: string;
  }) {
    const accessToken = await this.getAccessToken(code);
    const url = 'https://api.github.com/user';
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken.access_token}`,
      },
    });
    const user = response.data;
    const existUser = await this.userService.getOneByOAuthId(user.id);

    if (existUser) {
      return {
        user: existUser,
      };
    }
    return user;
  }

  async getAccessToken(code: string): Promise<IAccessTokenInfo> {
    const githubUrl = 'https://github.com/login/oauth/access_token';

    const queryConfig = {
      client_id: process.env['GITHUB_CLIENT_ID'],
      client_secret: process.env['GITHUB_CLIENT_SECRET'],
      code,
    };

    const paramsObj = new URLSearchParams(queryConfig);
    const queryString = `?${paramsObj.toString()}`;
    const url = githubUrl + queryString;
    try {
      const token = await axios.post<IAccessTokenInfo>(githubUrl, queryConfig, {
        headers: {
          Accept: 'application/json',
        },
      });
      return token.data;
    } catch (error) {}
  }
}
