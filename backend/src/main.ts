import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

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
    }),
  );
  const PORT = 3500;
  await app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
  });
}
bootstrap();
