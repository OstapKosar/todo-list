import type { Request } from 'express';
import type { JwtPayload } from 'src/jwt/jwt.service';

export type AuthenticatedRequest = Request & {
  ctx: JwtPayload & { accessToken: string; refreshToken: string };
  cookies: {
    [key: string]: string;
  };
};
