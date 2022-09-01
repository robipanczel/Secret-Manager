import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  CreateSecretDto,
  PaginationQuery,
  ReadSecretMetaDto,
} from '@secret-manager/api-interfaces';
import { Secret } from './schemas/secret.schema';
import { SecretService } from './secret.service';

@Controller('secret')
export class SecretController {
  constructor(private readonly secretService: SecretService) {}

  @Get()
  async getAllSecretMetaData(
    @Query() paginationQuery: PaginationQuery
  ): Promise<ReadSecretMetaDto[]> {
    return await this.secretService.getAllSecretMetaData(paginationQuery);
  }

  @Get(':hashedSecretText')
  async getSecret(
    @Param('hashedSecretText') hashedSecretText: string
  ): Promise<Secret> {
    return await this.secretService.getSecret(hashedSecretText);
  }

  @Post()
  async createSecret(
    @Body() secretDto: CreateSecretDto
  ): Promise<ReadSecretMetaDto> {
    return await this.secretService.createSecret(secretDto);
  }
}
