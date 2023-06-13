import { Test, TestingModule } from '@nestjs/testing';
import { ScopeAttributeService } from './scope-attribute.service';

describe('ScopeAttributeService', () => {
  let service: ScopeAttributeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScopeAttributeService],
    }).compile();

    service = module.get<ScopeAttributeService>(ScopeAttributeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
