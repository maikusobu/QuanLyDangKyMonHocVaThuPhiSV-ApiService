import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AtStrategyProvider } from "@common/strategies/at.strategy";
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [AuthService, AtStrategyProvider],
  exports: [AuthService, AtStrategyProvider],
})
export class AuthModule {}
