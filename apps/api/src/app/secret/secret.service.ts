import { Injectable } from '@nestjs/common';
import {
  CreateSecretDto,
  PaginationQuery,
  ReadSecretMetaDto,
} from '@secret-manager/api-interfaces';
import { Secret } from './schemas/secret.schema';
import {
  readSecretMetaDtos,
  secretDtoStub,
} from './tests/stubs/secret.dto.stub';

@Injectable()
export class SecretService {
  async getAllSecretNames(
    paginationQuery: PaginationQuery
  ): Promise<ReadSecretMetaDto[]> {
    return readSecretMetaDtos();
  }

  async getSecret(hashedSecretText: string): Promise<Secret> {
    return secretDtoStub();
  }

  async createSecret(secretDto: CreateSecretDto): Promise<Secret> {
    return secretDtoStub();
  }
}
