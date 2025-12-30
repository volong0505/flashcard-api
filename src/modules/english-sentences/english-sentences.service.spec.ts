import { Test, TestingModule } from '@nestjs/testing';
import { EnglishSentencesService } from './english-sentences.service';

describe('EnglishSentencesService', () => {
  let service: EnglishSentencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnglishSentencesService],
    }).compile();

    service = module.get<EnglishSentencesService>(EnglishSentencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
