import { Injectable } from '@nestjs/common';
import { Message } from '@secret-manager/api-interfaces';

@Injectable()
export class AppService {
  healthCheck(): Message {
    return { message: 'Welcome to api!' };
  }
}
