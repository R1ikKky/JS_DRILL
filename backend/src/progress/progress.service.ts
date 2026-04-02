import { Injectable } from '@nestjs/common';
import { IProgressRepository, TopicStat } from './repositories/progress.repository.interface';
import { UserProgress } from './entities/user-progress.entity';
import { computeXp } from './xp.util';

@Injectable()
export class ProgressService {
  constructor(private readonly progressRepository: IProgressRepository) {}

  async saveProgress(data: {
    userId: string;
    track: string;
    topic: string;
    difficulty: string;
    mode: string;
    verdict: string;
  }): Promise<{ xpAwarded: number }> {
    const xpAwarded = computeXp(data.difficulty, data.verdict);
    await this.progressRepository.save({ ...data, xpAwarded });
    return { xpAwarded };
  }

  findByUserId(
    userId: string,
    limit = 20,
    offset = 0,
  ): Promise<UserProgress[]> {
    return this.progressRepository.findByUserId(userId, limit, offset);
  }

  getStatsByUserId(userId: string): Promise<TopicStat[]> {
    return this.progressRepository.getStatsByUserId(userId);
  }

  countByUserId(userId: string): Promise<number> {
    return this.progressRepository.countByUserId(userId);
  }
}
