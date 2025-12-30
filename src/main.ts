import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { TransformInterceptor } from './_common/interceptors/transform.interceptor';


const port= process.env.PORT || 3333

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.use(bodyParser.json({ limit: '50mb' }), cookieParser());

  app.enableCors({
    origin: ['http://localhost:4200'], 
    credentials: true, 
  });

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
