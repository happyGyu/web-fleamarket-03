import { Controller, Res, HttpStatus, Get, Post, Body } from '@nestjs/common';
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
    const user = this.authenticationService.loginWithOAuth(oauthDto);
    return res.status(HttpStatus.OK).json({ ok: true, user });
  }
}
