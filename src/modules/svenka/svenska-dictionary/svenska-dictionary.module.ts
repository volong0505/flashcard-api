import { Module } from '@nestjs/common';
import { SvenskaDictionaryController } from './svenska-dictionary.controller';
import { SvenskaDictionaryService } from './svenska-dictionary.service';

@Module({
  controllers: [SvenskaDictionaryController],
  providers: [SvenskaDictionaryService]
})
export class SvenskaDictionaryModule {}
