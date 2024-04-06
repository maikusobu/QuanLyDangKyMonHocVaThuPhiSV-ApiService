import { Controller, Post, Body, Get, Res, Req } from "@nestjs/common";
import { LoginDto } from "./dto/LoginDto";
import { AuthService } from "./auth.service";
import { Response, Request } from "express";
import { Public } from "@common/decorators/public.decorator";
@Controller("auth")
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("login")
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(loginDto, res);
  }
  @Post("logout")
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(req, res);
  }
  @Get("refresh")
  async refresh(@Req() req: Request) {
    return this.authService.refresh(req);
  }
}
