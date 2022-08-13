import { Module } from '@nestjs/common';
import { SecretService } from './secret.service';
import { SecretController } from './secret.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Secret, SecretSchema } from './schemas/secret.schema';
import { SecretRepository } from './secret.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Secret.name, schema: SecretSchema }]),
  ],
  providers: [SecretService, SecretRepository],
  controllers: [SecretController],
})
export class SecretModule {}
