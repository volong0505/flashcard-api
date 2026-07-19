import { Test, TestingModule } from '@nestjs/testing';
import { EnglishStructuresController } from './english-structures.controller';

describe('EnglishStructuresController', () => {
  let controller: EnglishStructuresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnglishStructuresController],
    }).compile();

    controller = module.get<EnglishStructuresController>(EnglishStructuresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
