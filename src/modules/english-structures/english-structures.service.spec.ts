import { Test, TestingModule } from '@nestjs/testing';
import { EnglishStructuresService } from './english-structures.service';

describe('EnglishStructuresService', () => {
  let service: EnglishStructuresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnglishStructuresService],
    }).compile();

    service = module.get<EnglishStructuresService>(EnglishStructuresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
