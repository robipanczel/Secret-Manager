import { Controller, Get, Param } from '@nestjs/common';
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
}
