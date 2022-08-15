import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(paginationQuery: PaginationQuery): Promise<Secret[]> {
    return this.secretModel
      .find()
      .skip(paginationQuery.offset)
      .limit(paginationQuery.limit)
      .exec();
  }

  async findOne(id: string): Promise<Secret> {
    const secret = await this.secretModel.findById(id);

    if (!secret) {
      throw new NotFoundException(`Secret with ID ${id} not found`);
    }

    return secret;
  }

  async create(createSecretDto: CreateSecretDto): Promise<Secret> {
    return await this.secretModel.create(createSecretDto);
  }

  async update(id: string, update: UpdateSecretMetaDto): Promise<Secret> {
    const updatedSecret = await this.secretModel.findByIdAndUpdate(id, update);

    if (!updatedSecret) {
      throw new NotFoundException(`Secret with ID ${id} not found`);
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
