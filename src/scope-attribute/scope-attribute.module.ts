import { Module } from '@nestjs/common';
import { ScopeAttributeController } from './scope-attribute.controller';

@Module({
  controllers: [ScopeAttributeController]
})
export class ScopeAttributeModule {}
