import { Module, Global } from "@nestjs/common";
import { UserRepository } from "@repository/user/user.repository";
import { AuthRepository } from "@repository/auth/auth.repostiory";
@Global()
@Module({
  providers: [UserRepository, AuthRepository],
  exports: [UserRepository, AuthRepository],
})
export class RepositoryModule {}
