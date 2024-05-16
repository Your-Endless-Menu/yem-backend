import { NestFactory } from '@nestjs/core';
import {SwaggerModule, DocumentBuilder, SwaggerDocumentOptions} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(3000);
}
bootstrap();
