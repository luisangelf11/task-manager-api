import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Validate DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('Tasks manager')
    .setDescription('This is a tasks manager API made with nest js')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Enabled cors
  app.enableCors();
  //Run server on port 3000 or env
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
