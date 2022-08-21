import { OauthStrategyFactory } from './../strategy/oauthStrategy.factory';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly strategyFactory: OauthStrategyFactory,
  ) {}
  async loginWithOAuth({
    oAuthOrigin,
    code,
  }: {
    oAuthOrigin: string;
    code: string;
  }) {
    const strategy = this.strategyFactory.build(oAuthOrigin);
    const resourceServerAccessToken = await strategy.getToken(code);
    const resourceServerUser = await strategy.requestLogin(
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

  async validateAccessToken(accessToken: string) {
    try {
      const userId = this.tokenService.verify(accessToken);
      const user = await this.userService.getOneByUserId(userId);
      return user;
    } catch (error) {
      throw new HttpException('유효하지 않은 토큰', HttpStatus.UNAUTHORIZED);
    }
  }
}
