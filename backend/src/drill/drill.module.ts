import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { DrillController } from './drill.controller';
import { DrillService } from './drill.service';
import {
  createDeepSeekClient,
  DEEPSEEK_CLIENT,
} from '../config/deepseek.config';
import { ProgressModule } from '../progress/progress.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ProgressModule, UserModule],
  controllers: [DrillController],
  providers: [
    DrillService,
    {
      provide: DEEPSEEK_CLIENT,
      useFactory: (configService: ConfigService): OpenAI => {
        const apiKey = configService.getOrThrow<string>('DEEPSEEK_API_KEY');
        return createDeepSeekClient(apiKey);
      },
      inject: [ConfigService],
    },
  ],
})
export class DrillModule {}
