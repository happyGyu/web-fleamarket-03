import { Controller, Res, HttpStatus, Post, Body } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';

@Controller('login')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  async oAuthLogin(
    @Res() res: Response,
    @Body() oauthDto: { oAuthOrigin: string; code: string },
  ) {
    const { user, refreshToken, accessToken, isExist } =
      await this.authenticationService.loginWithOAuth(oauthDto);

    const refreshCookie = `Refresh=${refreshToken}; HttpOnly; Path=/;}`;
    res.setHeader('SET-COOKIE', refreshCookie);

    return res.status(HttpStatus.OK).json({ isExist, user, accessToken });
  }
}
