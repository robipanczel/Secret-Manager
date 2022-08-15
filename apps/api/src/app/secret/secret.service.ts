import { Injectable } from '@nestjs/common';
import {
  CreateSecretDto,
  PaginationQuery,
  ReadSecretMetaDto,
} from '@secret-manager/api-interfaces';
import { Secret } from './schemas/secret.schema';
import { SecretRepository } from './secret.repository';

@Injectable()
export class SecretService {
  constructor(private readonly secretRepository: SecretRepository) {}

  async getAllSecretNames(
    paginationQuery: PaginationQuery
  ): Promise<ReadSecretMetaDto[]> {
    return await this.secretRepository.findAll(paginationQuery);
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
    const {
      _id,
      hashedSecretText,
      secretName,
      remainingViews,
      createdAt,
      updatedAt,
    } = await this.secretRepository.create(secretDto);

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
