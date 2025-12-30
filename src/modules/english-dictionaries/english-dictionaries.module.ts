import { Module } from '@nestjs/common';
import { EnglishDictionariesService } from './english-dictionaries.service';
import { EnglishDictionariesController } from './english-dictionaries.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EnglishDictionary, EnglishDictionarySchema } from 'src/database';
import { EnglishDictionariesRepository } from './english-dictionaries.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EnglishDictionary.name, schema: EnglishDictionarySchema
      }
    ])
  ],
  providers: [EnglishDictionariesService, EnglishDictionariesRepository],
  controllers: [EnglishDictionariesController]
})
export class EnglishDictionariesModule {}
