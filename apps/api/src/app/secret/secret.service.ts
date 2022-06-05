import { Injectable } from '@nestjs/common';
import { Secret } from './schemas/secret.schema';

@Injectable()
export class SecretService {
  async getSecret(hashedSecretText: string): Promise<Secret> {
    return null;
  }
}
