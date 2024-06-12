import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { END_POINTS } from "./util/constants";
import { ConfigService } from "@nestjs/config";
// import { AtGuard } from "@common/guards/at.guard";
// import { PermissionGuard } from "@common/guards/permission.guard";
// import { AuthRepository } from "@repository/auth/auth.repostiory";
import helmet from "helmet";
import * as cookieParser from "cookie-parser";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AtGuard } from "@common/guards/at.guard";
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get(ConfigService);
  const reflector = app.get("Reflector");
  const port = configService.get<number>("port");
  const env = configService.get<string>("env");
  const jwt = configService.get<string>("jwt_access_secret");

  app.enableCors({
    origin: false,
  });
  app.use(helmet());
  app.use(cookieParser.default());
  app.useGlobalGuards(new AtGuard(reflector));
  // app.useGlobalGuards(new PermissionGuard(reflector, app.get(AuthRepository)));
  app.setGlobalPrefix(END_POINTS.BASE);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.listen(port || 5000);
  console.log(`Server running on ${port}`);
  console.log(`In ${env} mode`);
  console.log(`JWT secret: ${jwt}`);
}

bootstrap();
