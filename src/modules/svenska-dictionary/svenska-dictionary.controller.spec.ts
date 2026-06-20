import { Test, TestingModule } from '@nestjs/testing';
import { SvenskaDictionaryController } from './svenska-dictionary.controller';

describe('SvenskaDictionaryController', () => {
  let controller: SvenskaDictionaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SvenskaDictionaryController],
    }).compile();

    controller = module.get<SvenskaDictionaryController>(SvenskaDictionaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
