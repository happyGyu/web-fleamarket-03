import { OauthStrategyFactory } from './../strategy/oauthStrategy.factory';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { TokenService } from './token.service';

interface LoginWithOAuth {
  oAuthOrigin: string;
  code: string;
}

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly strategyFactory: OauthStrategyFactory,
  ) {}

  async loginWithOAuth({ oAuthOrigin, code }: LoginWithOAuth) {
    const strategy = this.strategyFactory.build(oAuthOrigin);
    const { access_token: oAuthAccessToken } = await strategy.getToken(code);
    const { id: oAuthId } = await strategy.requestLogin(oAuthAccessToken);
    const oAuthInfo = { oAuthOrigin, oAuthId };

    const clientUser = await this.userService.getOneByOAuthId(oAuthId);

    if (!clientUser) {
      return {
        isRegistered: false,
        oAuthInfo,
      };
    }

    const { id: userId } = clientUser;
    const jwtTokenSet = this.tokenService.getTokenSet(userId);

    return {
      isRegistered: true,
      user: clientUser,
      oAuthInfo,
      ...jwtTokenSet,
    };
  }

  async getAuthorizedUser(accessToken: string) {
    const userId = this.tokenService.verify(accessToken, 'access');
    const user = await this.userService.getOneByUserId(userId);
    return user;
  }
}
