import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecretModule } from './secret/secret.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/secret'), SecretModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
