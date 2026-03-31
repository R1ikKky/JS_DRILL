import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Sse,
  Res,
} from '@nestjs/common';
import type { MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { Response } from 'express';
import { DrillService, SsePayload } from './drill.service';
import { QuestionQueryDto, EvaluateBodyDto } from './drill.dto';

@Controller('drill')
export class DrillController {
  constructor(private readonly drillService: DrillService) {}

  /**
   * GET /drill/question?topic=promises&difficulty=medium
   * Returns an SSE stream of the generated question token by token.
   */
  @Sse('question')
  streamQuestion(
    @Query() query: QuestionQueryDto,
  ): Observable<MessageEvent> {
    return this.drillService.streamQuestion(query);
  }

  /**
   * POST /drill/evaluate
   * Returns an SSE stream of the evaluation/feedback token by token.
   *
   * NestJS @Sse() only supports GET, so we handle POST SSE manually
   * via @Res() with raw Express response writes.
   */
  @Post('evaluate')
  streamEvaluation(
    @Body() body: EvaluateBodyDto,
    @Res() res: Response,
  ): void {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const observable = this.drillService.streamEvaluation(body);

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
