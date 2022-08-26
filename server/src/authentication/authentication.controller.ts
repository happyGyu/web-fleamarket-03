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
import extractRegionsFromUserRegions from 'src/util/parseUtil';
import { UseAuthGuard } from './decorators/use.auth.guard.decorator';
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

  @Get('resign')
  relogin(@Res() res: Response, @Req() req: Request) {
    const refreshToken = req.cookies.Refresh;
    const newAccessToken =
      this.authenticationService.resignAccessToken(refreshToken);
    return res.status(HttpStatus.OK).json(newAccessToken);
  }

  @Get('user')
  @UseAuthGuard()
  async getAuthorizedUser(@Res() res: Response, @Req() req: Request) {
    const loginUser = req['user'];
    const userRegions = loginUser.regions;
    const regions = extractRegionsFromUserRegions(userRegions);
    return res.status(HttpStatus.OK).json({ ...loginUser, regions });
  }
}
