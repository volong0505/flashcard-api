import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule, UsersModule } from './modules';
import { EnglishDictionariesModule } from './modules/english-dictionaries/english-dictionaries.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EnglishFlashcardModule } from './modules/english-flashcards/english-flashcards.module';
import { EnglishSentencesModule } from './modules/english-sentences/english-sentences.module';
import { GoogleTtsModule } from './modules/google-tts/google-tts.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './_common/interceptors/transform.interceptor';


@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({  isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGO_URI  || 'mongodb://localhost:27017'),

    UsersModule,
    AuthModule,
    EnglishDictionariesModule,
    EnglishFlashcardModule,
    EnglishSentencesModule,
    GoogleTtsModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
