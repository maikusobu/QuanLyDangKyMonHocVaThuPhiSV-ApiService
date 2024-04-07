import { Module, DynamicModule } from "@nestjs/common";
import { AuthRepository } from "@repository/auth/auth.repostiory";
import { UserRepository } from "@repository/user/user.repository";
@Module({})
export class RepositoryModule {
  static forRoot({ isGlobal = false }): DynamicModule {
    return {
      global: isGlobal,
      module: RepositoryModule,
      providers: [UserRepository, AuthRepository],
      exports: [UserRepository, AuthRepository],
    };
  }
}
