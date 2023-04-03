import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateSecretDto,
  PaginationQuery,
  ReadSecretDto,
  ReadSecretMetaDto,
} from '@secret-manager/api-interfaces';
import { SecretRepository } from './secret.repository';
import { MD5 } from 'object-hash';

@Injectable()
export class SecretService {
  constructor(private readonly secretRepository: SecretRepository) {}

  async getAllSecretMetaData(paginationQuery: PaginationQuery) {
    const secrets = await this.secretRepository.findAll(paginationQuery);
    return secrets.map(
      (secret) =>
        new ReadSecretMetaDto(
          secret.hashedSecretText,
          secret.secretName,
          secret.remainingViews,
          secret.createdAt,
          secret.updatedAt
        )
    );
  }

  async getSecret(hashedSecretText: string) {
    const secret = await this.secretRepository.findOne(hashedSecretText);

    if (!secret) {
      throw new NotFoundException(
        `Secret with hash ${hashedSecretText} not found`
      );
    }

    const updatedOrRemovedSecret =
      secret.remainingViews === 1
        ? await this.secretRepository.remove(hashedSecretText)
        : await this.secretRepository.update(hashedSecretText, {
            remainingViews: secret.remainingViews - 1,
          });

    if (!updatedOrRemovedSecret) {
      throw new NotFoundException(
        `Secret with hash ${hashedSecretText} not found`
      );
    }

    return new ReadSecretDto(
      updatedOrRemovedSecret.hashedSecretText,
      updatedOrRemovedSecret.secretName,
      updatedOrRemovedSecret.secretText,
      updatedOrRemovedSecret.remainingViews,
      updatedOrRemovedSecret.createdAt,
      updatedOrRemovedSecret.updatedAt
    );
  }

  async createSecret(secretDto: CreateSecretDto) {
    const hashedText = MD5(secretDto.secretText);

    const {
      hashedSecretText,
      secretName,
      remainingViews,
      createdAt,
      updatedAt,
    } = await this.secretRepository.create(secretDto, hashedText);

    return {
      hashedSecretText,
      secretName,
      remainingViews,
      createdAt,
      updatedAt,
    } as ReadSecretMetaDto;
  }
}
