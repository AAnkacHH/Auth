import { Test, TestingModule } from '@nestjs/testing';
import { ScopeAttributeController } from './scope-attribute.controller';

describe('ScopeAttributeController', () => {
  let controller: ScopeAttributeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScopeAttributeController],
    }).compile();

    controller = module.get<ScopeAttributeController>(ScopeAttributeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
