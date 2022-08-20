import { OauthStrategyFactory } from './../strategy/oauthStrategy.factory';
import { Injectable } from '@nestjs/common';

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
    targetOAuthOrigin,
    code,
  }: {
    targetOAuthOrigin: string;
    code: string;
  }) {
    const strategy = this.strategyFactory.build(targetOAuthOrigin);
    const resourceServerAccessToken = await strategy.getToken(code);
    const resourceServerUser = await strategy.requestLogin(
      resourceServerAccessToken.access_token,
    );

    const clientUser = await this.userService.getOneByOAuthId(
      resourceServerUser.id,
    );

    const oAuthInfo = {
      targetOAuthOrigin,
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
}
