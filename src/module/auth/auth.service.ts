import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthRepository } from "@repository/auth/auth.repostiory";
import { UserRepository } from "@repository/user/user.repository";
import { LoginDto } from "./dto/LoginDto";
@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const token = await this.authRepository.signIn(loginDto, user);

    return { access_token: token };
  }

  // async logout(req: FastifyRequest, res: FastifyReply) {
  //   this.authRepository.signOut(req, res);
  //   return "Logout success";
  // }
  // async refresh(req: Request) {
  //   return { access_token: this.authRepository.refresh(req) };
  // }
}
