import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //Converts JSON body from the request into a DTO instance
      whitelist: true, // Removes any extra field submitted on the request that's not listed on the DTO
      forbidNonWhitelisted: true, // Throws a (400 error) if any extra field is submitted
      transformOptions: {
        enableImplicitConversion: true, // If user submits "123" converst to 123 automatically without errors
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
