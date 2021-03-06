import { Controller, Get } from '@nestjs/common';

import { Message } from '@secret-manager/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  healthCheck(): Message {
    return this.appService.healthCheck();
  }
}
