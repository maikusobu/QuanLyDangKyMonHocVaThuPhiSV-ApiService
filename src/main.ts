import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { END_POINTS } from "./util/constants";
import { ConfigService } from "@nestjs/config";
import { AtGuard } from "@common/guards/at.guard";
import { PermissionGuard } from "@common/guards/permission.guard";
import { AuthRepository } from "@repository/auth/auth.repostiory";
import * as cookieParser from "cookie-parser";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const reflector = app.get("Reflector");
  const url = configService.get<string>("url");
  const port = configService.get<number>("port");
  const env = configService.get<string>("env");
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalGuards(new AtGuard(reflector));
  app.useGlobalGuards(new PermissionGuard(reflector, app.get(AuthRepository)));
  app.setGlobalPrefix(END_POINTS.BASE);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.use(cookieParser.default());
  await app.listen(port);
  console.log(`Server running on ${url}`);
  console.log(`In ${env} mode`);
}

bootstrap();
