import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.accessToken as string;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(), // Fallback to header
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET!,
    });
  }

  validate(payload: { sub: string; email: string; name: string }) {
    // payload is the decoded token
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}
