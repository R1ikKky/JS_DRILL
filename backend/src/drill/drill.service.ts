import { Inject, Injectable } from '@nestjs/common';
import type { MessageEvent } from '@nestjs/common';
import { Observable, Subscriber } from 'rxjs';
import OpenAI from 'openai';
import { DEEPSEEK_CLIENT } from '../config/deepseek.config';
import { QuestionQueryDto, EvaluateBodyDto } from './drill.dto';
import { buildQuestionPrompt, buildEvaluationPrompt } from './prompt.builder';

export interface SsePayload {
  token?: string;
  done?: boolean;
  error?: boolean;
  message?: string;
}

@Injectable()
export class DrillService {
  constructor(@Inject(DEEPSEEK_CLIENT) private readonly deepseek: OpenAI) {}

  streamQuestion(dto: QuestionQueryDto): Observable<MessageEvent> {
    const prompt = buildQuestionPrompt(dto.track, dto.topic, dto.difficulty, dto.mode ?? 'drill');
    return this.createStream(prompt);
  }

  streamEvaluation(dto: EvaluateBodyDto): Observable<MessageEvent> {
    const prompt = buildEvaluationPrompt(
      dto.track,
      dto.topic,
      dto.difficulty,
      dto.question,
      dto.answer,
      dto.mode ?? 'drill',
    );
    return this.createStream(prompt);
  }

  private createStream(prompt: string): Observable<MessageEvent> {
    return new Observable((subscriber: Subscriber<MessageEvent>) => {
      let aborted = false;

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
              const payload: SsePayload = { token: content };
              subscriber.next({ data: payload });
            }
          }

          if (!aborted) {
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
}
