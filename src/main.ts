import { NestFactory } from '@nestjs/core';
import {SwaggerModule, DocumentBuilder, SwaggerDocumentOptions} from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders:
        'Content-Type, Accept, Authorization, Access-Control-Allow-Methods',
  });

  const config = new DocumentBuilder()
      .setTitle('Your Endless Menu')
      .setDescription('This is API for Your Endless Menu')
      .setVersion('1.0')
      .addTag('user')
      .build();

  const options: SwaggerDocumentOptions =  {
    operationIdFactory: (
        controllerKey: string,
        methodKey: string
    ) => methodKey
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  app.use(passport.initialize());
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
