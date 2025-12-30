import { Module } from '@nestjs/common';
import { EnglishFlashcardController } from './english-flashcards.controller';
import { EnglishFlashcardService } from './english-flashcards.service';
import { EnglishFlascardListener } from './english-flashcard.listener';
import { EnglishFlashcardsRepository } from './english-flashcards.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { EnglishFlashcard, EnglishFlashcardSchema } from 'src/database';
import { EnglishSentencesModule } from '../english-sentences/english-sentences.module';

@Module({
  imports: [
     MongooseModule.forFeature([
          {
            name: EnglishFlashcard.name, schema: EnglishFlashcardSchema
          }
        ]),
    EnglishSentencesModule
  ],
  controllers: [EnglishFlashcardController],
  providers: [EnglishFlashcardService, EnglishFlascardListener, EnglishFlashcardsRepository]
})
export class EnglishFlashcardModule {}
