import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

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

  verify(accessToken: string) {
    const tokenSecret = this.configService.get('JWT_ACCESS_TOKEN_SECRET');

    const { userId } = this.jwtService.verify<{ userId: string }>(accessToken, {
      secret: tokenSecret,
    });
    return userId;
  }
}
