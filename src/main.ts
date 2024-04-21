import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { END_POINTS } from "./util/constants";
import { ConfigService } from "@nestjs/config";
import { AtGuard } from "@common/guards/at.guard";
import { PermissionGuard } from "@common/guards/permission.guard";
import { AuthRepository } from "@repository/auth/auth.repostiory";
import { Response } from "express";
import * as cookieParser from "cookie-parser";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const reflector = app.get("Reflector");
  const port = configService.get<number>("port");
  const env = configService.get<string>("env");
  const jwt = configService.get<string>("jwt_access_secret");
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
  const server = app.getHttpServer();
  const router = server._events.request._router;
  router.get("/api/v1/", (_, res: Response) => {
    res.status(200);
    res.send("Server working properly");
  });
  app.use(cookieParser.default());
  await app.listen(port);
  console.log(`Server running on ${port}`);
  console.log(`In ${env} mode`);
  console.log(`JWT secret: ${jwt}`);
}

bootstrap();
