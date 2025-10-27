import { HttpStatus } from '@nestjs/common';
import { ExtendedHttpException } from '../exceptions/extended.http-exception';
import { JwtTokenType } from '../types/jwt.types';
import {
  fifteenMinutesInMilliseconds,
  thirtyDaysInMilliseconds,
  thirtyMinutesInMilliseconds,
} from 'src/common/constants/time.constants';

export const jwtTokenOptionsByType: Record<
  JwtTokenType,
  {
    cookieKey: string;
    secret: string;
    expiresIn: string;
    maxAge: number;
  }
> = {
  access: {
    secret: process.env.ACCESS_TOKEN_SECRET!,
    expiresIn: '15m',
    maxAge: fifteenMinutesInMilliseconds,
    cookieKey: 'accessToken',
  },
  refresh: {
    secret: process.env.REFRESH_TOKEN_SECRET!,
    expiresIn: '30d',
    maxAge: thirtyDaysInMilliseconds,
    cookieKey: 'refreshToken',
  },
  forgotPassword: {
    secret: process.env.FORGOT_PASSWORD_TOKEN_SECRET!,
    expiresIn: '30m',
    maxAge: thirtyMinutesInMilliseconds,
    cookieKey: 'forgotPasswordToken',
  },
};

export const extendedUnauthorizedException = new ExtendedHttpException(
  'Unauthorized access',
  HttpStatus.UNAUTHORIZED,
);

export const cookies = {
  jwt: {
    access: { key: 'accessToken' },
    refresh: { key: 'refreshToken' },
    forgotPassword: { key: 'forgotPasswordToken' },
  },
};
