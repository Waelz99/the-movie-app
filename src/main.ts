import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { initSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up Swagger
  initSwagger(app);

  // Start application
  const port = process.env.PORT ?? 8080;
  await app.listen(port);

  Logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
