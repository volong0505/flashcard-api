import { Test, TestingModule } from '@nestjs/testing';
import { EnglishDictionariesService } from './english-dictionaries.service';

describe('EnglishDictionariesService', () => {
  let service: EnglishDictionariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnglishDictionariesService],
    }).compile();

    service = module.get<EnglishDictionariesService>(EnglishDictionariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
