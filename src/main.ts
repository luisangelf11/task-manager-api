import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Validate DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  //Enabled cors
  app.enableCors();
  //Run server on port 3000 or env
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
