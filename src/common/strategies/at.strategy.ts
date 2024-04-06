import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtATConstants } from "@util/constants";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AtStrategyProvider extends PassportStrategy(
  Strategy,
  jwtATConstants.stategy,
) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>("jwt_access_secret"),
    });
  }
  async validate(payload: any) {
    return { id: payload.id, role: payload.role };
  }
}
