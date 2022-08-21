import { JwtService } from '@nestjs/jwt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type JwtTokenType = 'access' | 'refresh';
@Injectable()
export class TokenService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  private tokenSecretMap = {
    access: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    refresh: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
  };

  async getAccessToken(userId: number) {
    const tokenSecret = this.tokenSecretMap.access;
    const expirationTime = this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    );
    return this.getToken({ userId, tokenSecret, expirationTime });
  }

  async getRefreshToken(userId: number) {
    const tokenSecret = this.tokenSecretMap.refresh;
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
    userId: number;
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

  verify(token: string, tokenType: JwtTokenType) {
    const tokenSecret = this.tokenSecretMap[tokenType];
    try {
      const { userId } = this.jwtService.verify<{ userId: string }>(token, {
        secret: tokenSecret,
      });
      return userId;
    } catch (e) {
      switch (e.message) {
        case 'INVALID_TOKEN':
        case 'TOKEN_IS_ARRAY':
        case 'NO_USER':
          throw new HttpException(
            '유효하지 않은 토큰입니다.',
            HttpStatus.UNAUTHORIZED,
          );
        case 'EXPIRED_TOKEN':
          throw new HttpException('토큰이 만료되었습니다.', HttpStatus.GONE);
        default:
          throw new HttpException(
            '서버 오류입니다.',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }
}
