import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerService } from './infrastructure/swagger/swagger.services';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const Swagger = new SwaggerService();
  app.useGlobalPipes(new ValidationPipe());

  Swagger.initialiseSwagger(app);
  await app.listen(3000);
}
bootstrap();
