import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { appConfig } from './app.config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(appConfig.mongodbUri)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
