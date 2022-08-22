import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateSecretDto,
  PaginationQuery,
  UpdateSecretMetaDto,
} from '@secret-manager/api-interfaces';
import { Model } from 'mongoose';
import { Secret } from './schemas/secret.schema';

@Injectable()
export class SecretRepository {
  constructor(
    @InjectModel(Secret.name)
    private readonly secretModel: Model<Secret>
  ) {}

  async findAll(paginationQuery: PaginationQuery): Promise<Secret[]> {
    return this.secretModel
      .find()
      .skip(paginationQuery.offset)
      .limit(paginationQuery.limit)
      .exec();
  }

  async findOne(hashedSecretText: string): Promise<Secret> {
    const secret = await this.secretModel.findOne({ hashedSecretText });

    if (!secret) {
      throw new NotFoundException(
        `Secret with ID ${hashedSecretText} not found`
      );
    }

    return secret;
  }

  async create(
    createSecretDto: CreateSecretDto,
    hashedSecretText: string
  ): Promise<Secret> {
    return await this.secretModel.create({
      ...createSecretDto,
      hashedSecretText,
    });
  }

  async update(hashedSecretText: string, update: UpdateSecretMetaDto): Promise<Secret> {
    const updatedSecret = await this.secretModel.findOneAndUpdate({hashedSecretText}, update);

    if (!updatedSecret) {
      throw new NotFoundException(`Secret with ID ${hashedSecretText} not found`);
    }

    return updatedSecret;
  }

  async remove(id: string): Promise<Secret> {
    const removedSecret = await this.secretModel.findByIdAndRemove(id);

    if (!removedSecret) {
      throw new NotFoundException(`Secret with ID ${id} not found`);
    }

    return removedSecret;
  }
}
