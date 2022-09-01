import { Injectable } from '@nestjs/common';
import {
  CreateSecretDto,
  PaginationQuery,
  ReadSecretMetaDto,
} from '@secret-manager/api-interfaces';
import { Secret } from './schemas/secret.schema';
import { SecretRepository } from './secret.repository';
import { MD5 } from 'object-hash';

@Injectable()
export class SecretService {
  constructor(private readonly secretRepository: SecretRepository) {}

  async getAllSecretMetaData(
    paginationQuery: PaginationQuery
  ): Promise<ReadSecretMetaDto[]> {
    const secrets = await this.secretRepository.findAll(paginationQuery);
    return secrets.map((secret) => {
      return {
        _id: secret._id,
        hashedSecretText: secret.hashedSecretText,
        secretName: secret.secretName,
        remainingViews: secret.remainingViews,
        createdAt: secret.createdAt,
        updatedAt: secret.updatedAt,
      };
    });
  }

  async getSecret(hashedSecretText: string): Promise<Secret> {
    const secret = await this.secretRepository.findOne(hashedSecretText);

    secret.remainingViews -= 1;
    if (secret.remainingViews === 0) {
      await this.secretRepository.remove(hashedSecretText);
    } else {
      await this.secretRepository.update(hashedSecretText, secret);
    }

    return secret;
  }

  async createSecret(secretDto: CreateSecretDto): Promise<ReadSecretMetaDto> {
    const hashedText = MD5(secretDto.secretText);

    const {
      _id,
      hashedSecretText,
      secretName,
      remainingViews,
      createdAt,
      updatedAt,
    } = await this.secretRepository.create(secretDto, hashedText);

    return {
      _id,
      hashedSecretText,
      secretName,
      remainingViews,
      createdAt,
      updatedAt,
    } as ReadSecretMetaDto;
  }
}
