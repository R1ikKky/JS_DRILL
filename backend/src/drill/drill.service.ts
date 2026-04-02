import { Inject, Injectable } from '@nestjs/common';
import type { MessageEvent } from '@nestjs/common';
import { Observable, Subscriber } from 'rxjs';
import OpenAI from 'openai';
import { DEEPSEEK_CLIENT } from '../config/deepseek.config';
import { QuestionQueryDto, EvaluateBodyDto } from './drill.dto';
import { buildQuestionPrompt, buildEvaluationPrompt } from './prompt.builder';
import { ProgressService } from '../progress/progress.service';
import { UserService } from '../user/user.service';
import { computeLevel, computeXp } from '../progress/xp.util';

export interface SsePayload {
  token?: string;
  done?: boolean;
  error?: boolean;
  message?: string;
}

const VERDICTS = ['ВЕРНО', 'ЧАСТИЧНО', 'НЕВЕРНО'] as const;

function extractVerdict(text: string): string | null {
  const firstWord = text.trimStart().split(/\s/)[0] ?? '';
  return (VERDICTS as readonly string[]).includes(firstWord) ? firstWord : null;
}

@Injectable()
export class DrillService {
  constructor(
    @Inject(DEEPSEEK_CLIENT) private readonly deepseek: OpenAI,
    private readonly progressService: ProgressService,
    private readonly userService: UserService,
  ) {}

  streamQuestion(dto: QuestionQueryDto): Observable<MessageEvent> {
    const prompt = buildQuestionPrompt(dto.track, dto.topic, dto.difficulty, dto.mode ?? 'drill');
    return this.createStream(prompt);
  }

  streamEvaluation(dto: EvaluateBodyDto, userId?: string): Observable<MessageEvent> {
    const prompt = buildEvaluationPrompt(
      dto.track,
      dto.topic,
      dto.difficulty,
      dto.question,
      dto.answer,
      dto.mode ?? 'drill',
    );
    return this.createStream(prompt, userId ? {
      userId,
      track: dto.track,
      topic: dto.topic,
      difficulty: dto.difficulty,
      mode: dto.mode ?? 'drill',
    } : undefined);
  }

  private createStream(
    prompt: string,
    progressCtx?: {
      userId: string;
      track: string;
      topic: string;
      difficulty: string;
      mode: string;
    },
  ): Observable<MessageEvent> {
    return new Observable((subscriber: Subscriber<MessageEvent>) => {
      let aborted = false;
      let accumulated = '';

      const run = async (): Promise<void> => {
        try {
          const stream = await this.deepseek.chat.completions.create({
            model: 'deepseek-chat',
            messages: [{ role: 'user', content: prompt }],
            stream: true,
            temperature: 0.8,
            max_tokens: 1024,
          });

          for await (const chunk of stream) {
            if (aborted) break;
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              accumulated += content;
              const payload: SsePayload = { token: content };
              subscriber.next({ data: payload });
            }
          }

          if (!aborted) {
            if (progressCtx) {
              void this.saveProgressAsync(accumulated, progressCtx);
            }
            const payload: SsePayload = { done: true };
            subscriber.next({ data: payload });
            subscriber.complete();
          }
        } catch (e: unknown) {
          const message =
            e instanceof Error ? e.message : 'Unknown streaming error';
          const payload: SsePayload = { error: true, message };
          subscriber.next({ data: payload });
          subscriber.complete();
        }
      };

      void run();

      return (): void => {
        aborted = true;
      };
    });
  }

  private async saveProgressAsync(
    feedbackText: string,
    ctx: {
      userId: string;
      track: string;
      topic: string;
      difficulty: string;
      mode: string;
    },
  ): Promise<void> {
    try {
      const verdict = extractVerdict(feedbackText);
      if (!verdict) return;

      const { xpAwarded } = await this.progressService.saveProgress({
        ...ctx,
        verdict,
      });

      if (xpAwarded > 0) {
        const user = await this.userService.findById(ctx.userId);
        if (user) {
          const newXp = user.xp + xpAwarded;
          const newLevel = computeLevel(newXp);
          await this.userService.updateXpAndLevel(ctx.userId, newXp, newLevel);
        }
      }
    } catch {
      // Non-critical — don't break the drill session
    }
  }
}
