import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import axios from 'axios';
import { UserService } from 'src/user/user.service';
import { TokenService } from './token.service';
import { IAccessTokenInfo } from '../types';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}
  async loginWithOAuth({
    oAuthOrigin,
    code,
  }: {
    oAuthOrigin: string;
    code: string;
  }) {
    const resourceServerAccessToken = await this.getResourceServerAccessToken(
      code,
    );

    const resourceServerUser = await this.getUserDataFromResourceServer(
      resourceServerAccessToken.access_token,
    );

    const clientUser = await this.userService.getOneByOAuthId(
      resourceServerUser.id,
    );

    const oAuthInfo = {
      oAuthOrigin,
      oAuthId: resourceServerUser.id,
    };

    if (clientUser) {
      const { oAuthId } = oAuthInfo;
      const accessToken = await this.tokenService.getAccessToken(oAuthId);
      const refreshToken = await this.tokenService.getRefreshToken(oAuthId);
      return {
        isRegistered: true,
        user: clientUser,
        oAuthInfo,
        accessToken,
        refreshToken,
      };
    }

    return {
      isRegistered: false,
      oAuthInfo,
    };
  }

  async getUserDataFromResourceServer(accessToken: string) {
    const url = 'https://api.github.com/user';
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const user = response.data;
      return user;
    } catch (error) {
      throw new HttpException(
        'not found user in github',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getResourceServerAccessToken(code: string): Promise<IAccessTokenInfo> {
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
