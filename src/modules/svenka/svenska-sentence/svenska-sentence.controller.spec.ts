import { Test, TestingModule } from '@nestjs/testing';
import { SvenskaSentenceController } from './svenska-sentence.controller';

describe('SvenskaSentenceController', () => {
  let controller: SvenskaSentenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SvenskaSentenceController],
    }).compile();

    controller = module.get<SvenskaSentenceController>(SvenskaSentenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
