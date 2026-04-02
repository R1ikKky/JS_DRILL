import { UserProgress } from '../entities/user-progress.entity';

export interface TopicStat {
  track: string;
  topic: string;
  correct: number;
  partial: number;
  wrong: number;
  totalXp: number;
}

export abstract class IProgressRepository {
  abstract save(data: {
    userId: string;
    track: string;
    topic: string;
    difficulty: string;
    mode: string;
    verdict: string;
    xpAwarded: number;
  }): Promise<UserProgress>;

  abstract findByUserId(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<UserProgress[]>;

  abstract getStatsByUserId(userId: string): Promise<TopicStat[]>;

  abstract countByUserId(userId: string): Promise<number>;
}
