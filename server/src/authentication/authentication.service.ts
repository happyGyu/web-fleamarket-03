import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { UserService } from 'src/user/user.service';
import { IAccessTokenInfo } from './types';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

    let accessToken;
    let refreshToken;
    if (clientUser) {
      accessToken = await this.getAccessToken(clientUser.oAuthId);
      refreshToken = await this.getRefreshToken(clientUser.oAuthId);
    }

    return {
      isExist: Boolean(clientUser),
      user: clientUser,
      accessToken,
      refreshToken,
    };
  }

  async getUserDataFromResourceServer(accessToken: string) {
    const url = 'https://api.github.com/user';
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const user = response.data;
    return user;
  }

  async getAccessToken(userId: string) {
    const tokenSecret = this.configService.get('JWT_ACCESS_TOKEN_SECRET');
    const expirationTime = this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    );

    return this.getToken({ userId, tokenSecret, expirationTime });
  }

  async getRefreshToken(userId: string) {
    const tokenSecret = this.configService.get('JWT_REFRESH_TOKEN_SECRET');
    const expirationTime = this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    );

    return this.getToken({ userId, tokenSecret, expirationTime });
  }

  async getToken({
    userId,
    tokenSecret,
    expirationTime,
  }: {
    userId: string;
    tokenSecret: string;
    expirationTime: number;
  }) {
    const payload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: tokenSecret,
      expiresIn: `${expirationTime}s`,
    });
    return token;
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
