import { Test, TestingModule } from '@nestjs/testing';
import { SvenskaSentenceService } from './svenska-sentence.service';

describe('SvenskaSentenceService', () => {
  let service: SvenskaSentenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SvenskaSentenceService],
    }).compile();

    service = module.get<SvenskaSentenceService>(SvenskaSentenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
