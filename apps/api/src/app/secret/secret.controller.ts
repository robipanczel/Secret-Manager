import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateSecretDto,
  PaginationQuery,
  ReadSecretDto,
  ReadSecretMetaDto,
} from '@secret-manager/api-interfaces';
import { SecretService } from './secret.service';

@ApiTags('secrets')
@Controller('secrets')
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
  ): Promise<ReadSecretDto> {
    return await this.secretService.getSecret(hashedSecretText);
  }

  @Post()
  async createSecret(
    @Body() secretDto: CreateSecretDto
  ): Promise<ReadSecretMetaDto> {
    return await this.secretService.createSecret(secretDto);
  }
}
