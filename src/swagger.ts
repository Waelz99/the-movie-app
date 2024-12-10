import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function initSwagger(app: INestApplication) {
  // Set up Swagger
  const config = new DocumentBuilder()
    .setTitle('The movie app')
    .setDescription(
      'CRUD (Create, Read, Update, Delete) application that consumes the TMDB APIs.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
}
