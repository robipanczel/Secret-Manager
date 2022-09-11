import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Message } from '@secret-manager/api-interfaces';

import { AppService } from './app.service';

@ApiTags('status')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  healthCheck(): Message {
    return this.appService.healthCheck();
  }
}
