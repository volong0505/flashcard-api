import { Test, TestingModule } from '@nestjs/testing';
import { EnglishSentencesController } from './english-sentences.controller';

describe('EnglishSentencesController', () => {
  let controller: EnglishSentencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnglishSentencesController],
    }).compile();

    controller = module.get<EnglishSentencesController>(EnglishSentencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
