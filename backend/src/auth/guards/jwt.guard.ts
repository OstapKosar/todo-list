import { CanActivate, ExecutionContext, Inject, mixin } from '@nestjs/common';
import { decode, verify } from 'jsonwebtoken';
import { AuthJwtService, JwtPayload } from 'src/jwt/jwt.service';
import { ExtendedHttpException } from '../exceptions/extended.http-exception';
import {
  extendedUnauthorizedException,
  cookies,
} from '../constants/jwt.constants';
import { jwtTokenOptionsByType } from '../constants/jwt.constants';
import { JwtTokenType } from '../types/jwt.types';
import type { AuthenticatedRequest } from '../types/request.types';

export const JwtGuard = (type: JwtTokenType = 'access') => {
  class AuthGuardMixin implements CanActivate {
    constructor(@Inject(AuthJwtService) readonly jwtService: AuthJwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      try {
        const request: AuthenticatedRequest = context
          .switchToHttp()
          .getRequest();

        const cookiesOptions = cookies.jwt[type];
        const token = request.cookies?.[cookiesOptions.key];

        if (!token) throw extendedUnauthorizedException;

        const jwtOptions = jwtTokenOptionsByType[type];

        verify(token, jwtOptions.secret);

        const payload = decode(token) as JwtPayload;

        if (!payload || !payload.uid) throw extendedUnauthorizedException;

        const isTokenValid = await this.jwtService.validateToken(
          type,
          payload.uid,
          token,
        );

        if (!isTokenValid) throw extendedUnauthorizedException;

        request.ctx = {
          ...payload,
          accessToken: request.cookies?.[cookies.jwt.access.key],
          refreshToken: request.cookies?.[cookies.jwt.refresh.key],
        };

        return true;
      } catch (e) {
        if (e instanceof ExtendedHttpException) throw e;
        throw extendedUnauthorizedException;
      }
    }
  }

  return mixin(AuthGuardMixin);
};
