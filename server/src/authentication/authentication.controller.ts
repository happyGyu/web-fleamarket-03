import {
  Controller,
  Res,
  HttpStatus,
  Post,
  Body,
  Req,
  Get,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthenticationService } from './service/authentication.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  async oAuthLogin(
    @Res() res: Response,
    @Body() oauthDto: { oAuthOrigin: string; code: string },
  ) {
    const { isRegistered, refreshToken, ...loginResult } =
      await this.authenticationService.loginWithOAuth(oauthDto);

    if (isRegistered) {
      const refreshCookie = `Refresh=${refreshToken}; HttpOnly; Path=/;}`;
      res.setHeader('SET-COOKIE', refreshCookie);
    }

    return res.status(HttpStatus.OK).json({ isRegistered, ...loginResult });
  }

  @Get('relogin')
  async relogin(@Res() res: Response, @Req() req: Request) {
    console.log(req.cookies.Refresh);
    return 'hi';
  }
}
