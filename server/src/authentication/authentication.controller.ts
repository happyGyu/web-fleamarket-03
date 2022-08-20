import { Controller, Res, HttpStatus, Post, Body } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './service/authentication.service';

@Controller('login')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  async oAuthLogin(
    @Res() res: Response,
    @Body() oauthDto: { targetOAuthOrigin: string; code: string },
  ) {
    const { isRegistered, refreshToken, ...loginResult } =
      await this.authenticationService.loginWithOAuth(oauthDto);

    if (isRegistered) {
      const refreshCookie = `Refresh=${refreshToken}; HttpOnly; Path=/;}`;
      res.setHeader('SET-COOKIE', refreshCookie);
    }

    return res.status(HttpStatus.OK).json({ isRegistered, ...loginResult });
  }
}
