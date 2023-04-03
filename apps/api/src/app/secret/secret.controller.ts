import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  CreateSecretDto,
  PaginationQuery,
} from '@secret-manager/api-interfaces';
import { SecretService } from './secret.service';

@Controller('secrets')
export class SecretController {
  constructor(private readonly secretService: SecretService) {}

  @Get()
  async getAllSecretMetaData(@Query() paginationQuery: PaginationQuery) {
    return await this.secretService.getAllSecretMetaData(paginationQuery);
  }

  @Get(':hashedSecretText')
  async getSecret(@Param('hashedSecretText') hashedSecretText: string) {
    return await this.secretService.getSecret(hashedSecretText);
  }

  @Post()
  async createSecret(@Body() secretDto: CreateSecretDto) {
    return await this.secretService.createSecret(secretDto);
  }
}
