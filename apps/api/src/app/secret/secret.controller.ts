import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSecretDto } from '@secret-manager/api-interfaces';
import { Secret } from './schemas/secret.schema';
import { SecretService } from './secret.service';

@Controller('secret')
export class SecretController {
  constructor(private readonly secretService: SecretService) {}

  @Get(':hashedSecretText')
  async getSecret(
    @Param('hashedSecretText') hashedSecretText: string
  ): Promise<Secret> {
    return await this.secretService.getSecret(hashedSecretText);
  }

  @Post()
  async createSecret(@Body() secretDto: CreateSecretDto): Promise<Secret> {
    return await this.secretService.createSecret(secretDto);
  }
}
