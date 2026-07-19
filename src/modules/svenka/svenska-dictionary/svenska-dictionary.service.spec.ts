import { Test, TestingModule } from '@nestjs/testing';
import { SvenskaDictionaryService } from './svenska-dictionary.service';

describe('SvenskaDictionaryService', () => {
  let service: SvenskaDictionaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SvenskaDictionaryService],
    }).compile();

    service = module.get<SvenskaDictionaryService>(SvenskaDictionaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
