import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "src/module/auth/dto/LoginDto";
import * as authHelper from "./helper/auth.helper";
import { JwtService } from "@nestjs/jwt";
import { userSelectType } from "src/db/schema";
import { ConfigService } from "@nestjs/config";
import { jwtATConstants, jwtRTConstants } from "@util/constants";
import { UserRepository } from "@repository/user/user.repository";
import { PERMISSIONS } from "@util/constants";
import { Response, Request } from "express";
@Injectable()
export class AuthRepository {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}
  async signIn(userLogin: LoginDto, userSelect: userSelectType, res: Response) {
    const isValid = await authHelper.comparePassword(
      userLogin.password,
      userSelect.hashedPassword,
    );
    if (!isValid) {
      throw new Error("Invalid email or password");
    }
    const token = await this.generateToken(userSelect);
    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });
    return token.accessToken;
  }
  private async generateToken(user: userSelectType) {
    const accessToken = await this.jwtService.signAsync(
      { id: user.id, role: user.role },
      {
        secret: this.config.get<string>("jwt_access_secret"),
        expiresIn: jwtATConstants.liveTimeAt,
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      { id: user.id },
      {
        secret: this.config.get<string>("jwt_refresh_secret"),
        expiresIn: jwtRTConstants.liveTimeAt,
      },
    );
    return { accessToken, refreshToken };
  }
  async hasPermission(userId: string, endpoint: string, method: string) {
    return this.userRepository.findPermission(
      Number(userId),
      endpoint,
      method as PERMISSIONS,
    );
  }
  async signOut(req: Request, res: Response) {
    const { refresh_token } = req.cookies;

    if (!refresh_token)
      throw new UnauthorizedException("Token not found", {
        cause: new Error("Token not found"),
      });
    res.clearCookie("refresh_token");
  }
  async refresh(req: Request) {
    const { refresh_token } = req.cookies;
    if (!refresh_token) throw new UnauthorizedException("Token not found");
    const payload = await this.jwtService.verifyAsync(refresh_token, {
      secret: this.config.get<string>("jwt_refresh_secret"),
    });
    if (!payload) throw new UnauthorizedException("Invalid token");
    const user = await this.userRepository.findById(payload.id);
    if (!user) throw new UnauthorizedException("User not found");
    return (await this.generateToken(user)).accessToken;
  }
  async changePassword() {}
}