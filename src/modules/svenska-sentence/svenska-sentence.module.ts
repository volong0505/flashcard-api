import { Module } from '@nestjs/common';
import { SvenskaSentenceController } from './svenska-sentence.controller';
import { SvenskaSentenceService } from './svenska-sentence.service';

@Module({
  controllers: [SvenskaSentenceController],
  providers: [SvenskaSentenceService]
})
export class SvenskaSentenceModule {}
