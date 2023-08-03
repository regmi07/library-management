import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as path from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Library Management System')
    .setVersion('1.0')
    .addTag('lms')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: '*',
    // allowedHeaders: '*',
    // methods: '*',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      skipNullProperties: true,
      transform: true,
    }),
  );

  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  const PORT = 3500;
  await app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend server is running on port ${PORT}`);
  });
}
bootstrap();
