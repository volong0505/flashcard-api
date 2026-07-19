import { Test, TestingModule } from '@nestjs/testing';
import { EnglishDictionariesController } from './english-dictionaries.controller';

describe('EnglishDictionariesController', () => {
  let controller: EnglishDictionariesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnglishDictionariesController],
    }).compile();

    controller = module.get<EnglishDictionariesController>(EnglishDictionariesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
