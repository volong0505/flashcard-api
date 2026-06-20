import { Module } from '@nestjs/common';
import { EnglishStructuresController } from './english-structures.controller';
import { EnglishStructuresService } from './english-structures.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EnglishStructure, EnglishStructureSchema } from '../../database/schemas/english-structure.schema';
import { EnglishStructuresRepository } from './english-structures.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EnglishStructure.name, schema: EnglishStructureSchema
      }
    ])
  ],
  controllers: [EnglishStructuresController],
  providers: [
    EnglishStructuresService,
    EnglishStructuresRepository
  ]
})
export class EnglishStructuresModule {}
