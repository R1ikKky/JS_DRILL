import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Sse,
  Res,
  Req,
} from '@nestjs/common';
import type { MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { Request, Response } from 'express';
import { DrillService, SsePayload } from './drill.service';
import { QuestionQueryDto, EvaluateBodyDto } from './drill.dto';
import { OptionalAuth } from '../common/decorators/optional-auth.decorator';

@OptionalAuth()
@Controller('drill')
export class DrillController {
  constructor(private readonly drillService: DrillService) {}

  @Sse('question')
  streamQuestion(
    @Query() query: QuestionQueryDto,
  ): Observable<MessageEvent> {
    return this.drillService.streamQuestion(query);
  }

  @Post('evaluate')
  streamEvaluation(
    @Body() body: EvaluateBodyDto,
    @Req() req: Request & { user?: { userId: string } },
    @Res() res: Response,
  ): void {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const userId = req.user?.userId;
    const observable = this.drillService.streamEvaluation(body, userId);

    const subscription = observable.subscribe({
      next: (event: MessageEvent) => {
        const payload = event.data as SsePayload;
        res.write(`data: ${JSON.stringify(payload)}\n\n`);
      },
      complete: () => {
        res.end();
      },
      error: (err: Error) => {
        const payload: SsePayload = { error: true, message: err.message };
        res.write(`data: ${JSON.stringify(payload)}\n\n`);
        res.end();
      },
    });

    res.on('close', () => {
      subscription.unsubscribe();
    });
  }
}
