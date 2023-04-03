import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateSecretDto,
  PaginationQuery,
  UpdateSecretMetaDto,
} from '@secret-manager/api-interfaces';
import { Model } from 'mongoose';
import { Secret, SecretDocument } from './schemas/secret.schema';

@Injectable()
export class SecretRepository {
  constructor(
    @InjectModel(Secret.name)
    private readonly secretModel: Model<SecretDocument>
  ) {}

  async findAll(paginationQuery: PaginationQuery) {
    return this.secretModel
      .find()
      .skip(paginationQuery.offset)
      .limit(paginationQuery.limit)
      .exec();
  }

  async findOne(hashedSecretText: string) {
    return await this.secretModel.findOne({ hashedSecretText });
  }

  async create(createSecretDto: CreateSecretDto, hashedSecretText: string) {
    return await this.secretModel.create({
      ...createSecretDto,
      hashedSecretText,
    });
  }

  async update(hashedSecretText: string, update: UpdateSecretMetaDto) {
    return await this.secretModel.findOneAndUpdate(
      { hashedSecretText },
      update
    );
  }

  async remove(hashedSecretText: string) {
    return await this.secretModel.findOneAndDelete({
      hashedSecretText,
    });
  }
}
