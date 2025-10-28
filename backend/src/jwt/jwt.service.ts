import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { JwtTokenType } from '../auth/types/jwt.types';
import { jwtTokenOptionsByType } from 'src/auth/constants/jwt.constants';
import { User } from '@prisma/client';

export type JwtPayload = {
  uid: string;
  email: string;
  name: string;
  postfix: string;
};

@Injectable()
export class AuthJwtService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  private getTokenConfig(type: JwtTokenType) {
    return jwtTokenOptionsByType[type];
  }

  async createToken(user: User, type: JwtTokenType): Promise<string> {
    const config = this.getTokenConfig(type);

    const payload: JwtPayload = {
      uid: user.id,
      email: user.email,
      name: user.name,
      postfix: user.id,
    };

    return this.jwtService.signAsync(payload, {
      secret: config.secret,
      expiresIn: config.expiresIn,
    });
  }

  async verifyToken(token: string, type: JwtTokenType): Promise<JwtPayload> {
    const config = this.getTokenConfig(type);

    try {
      return this.jwtService.verifyAsync(token, { secret: config.secret });
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async validateToken(
    type: JwtTokenType,
    userId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _token: string,
  ): Promise<boolean> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    const payload = await this.verifyToken(refreshToken, 'refresh');

    const user = await this.prisma.user.findUnique({
      where: { id: payload.uid },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.createToken(user, 'access');
  }

  async createTokenPair(
    user: any,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.createToken(user, 'access'),
      this.createToken(user, 'refresh'),
    ]);

    return { accessToken, refreshToken };
  }

  async validateAndExtractUser(
    token: string,
    type: JwtTokenType,
  ): Promise<any> {
    const payload = await this.verifyToken(token, type);

    const isValid = await this.validateToken(type, payload.uid, token);
    if (!isValid) {
      throw new UnauthorizedException('Invalid token');
    }

    return payload;
  }
}
