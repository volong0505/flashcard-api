import { Module } from '@nestjs/common';
import { EnglishSentencesController } from './english-sentences.controller';
import { EnglishSentencesService } from './english-sentences.service';
import { EnglishSentence, EnglishSentenceSchema } from '../../database';
import { MongooseModule } from '@nestjs/mongoose';
import { EnglishSentencesRepository } from './english-sentences.repository';

@Module({
  imports: [
      MongooseModule.forFeature([
          {
            name: EnglishSentence.name, schema: EnglishSentenceSchema
          }
        ])
  ],
  controllers: [EnglishSentencesController],
  providers: [
    EnglishSentencesService,
    EnglishSentencesRepository
  ],
  exports: [
    EnglishSentencesService
  ]
})
export class EnglishSentencesModule {}
