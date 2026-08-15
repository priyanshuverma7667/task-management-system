import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'dev-secret-change-me', // must match the secret in auth.module.ts
    });
  }

  async validate(payload: { sub: string; name: string }) {
    return { userId: payload.sub, name: payload.name };
  }
}
