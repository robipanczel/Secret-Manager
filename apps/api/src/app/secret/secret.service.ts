import { Injectable } from '@nestjs/common';
import { CreateSecretDto } from '@secret-manager/api-interfaces';
import { Secret } from './schemas/secret.schema';
import { secretDtoStub } from './tests/stubs/secret.dto.stub';

@Injectable()
export class SecretService {
  async getSecret(hashedSecretText: string): Promise<Secret> {
    return secretDtoStub();
  }

  async createSecret(secretDto: CreateSecretDto): Promise<Secret> {
    return secretDtoStub();
  }
}
