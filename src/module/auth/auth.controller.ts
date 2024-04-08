import { Controller, Post, Body, Get, Res, Req } from "@nestjs/common";
import { LoginDto } from "./dto/LoginDto";
import { AuthService } from "./auth.service";
import { Response, Request } from "express";
import { Public } from "@common/decorators/public.decorator";
import { END_POINTS } from "@util/constants";
const { AUTH } = END_POINTS;

@Controller(AUTH.BASE)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post(AUTH.LOGIN)
  @Public()
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(loginDto, res);
  }
  @Post(AUTH.LOGOUT)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(req, res);
  }
  @Get(AUTH.REFRESH)
  async refresh(@Req() req: Request) {
    return this.authService.refresh(req);
  }
}
