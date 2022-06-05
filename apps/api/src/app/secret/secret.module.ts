import { Module } from '@nestjs/common';
import { SecretService } from './secret.service';
import { SecretController } from './secret.controller';

@Module({
  imports: [],
  providers: [SecretService],
  controllers: [SecretController],
})
export class SecretModule {}
