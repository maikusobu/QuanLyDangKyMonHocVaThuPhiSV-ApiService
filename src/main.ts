import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { END_POINTS } from "./utils/constants";
import { ConfigService } from "@nestjs/config";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string>("PORT");
  app.enableCors();
  app.setGlobalPrefix(END_POINTS.BASE);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  console.log(`Server running on http://localhost:${port || 3000}`);
}
bootstrap();
