import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProgress } from '../entities/user-progress.entity';
import {
  IProgressRepository,
  TopicStat,
} from './progress.repository.interface';

@Injectable()
export class ProgressRepository implements IProgressRepository {
  constructor(
    @InjectRepository(UserProgress)
    private readonly repo: Repository<UserProgress>,
  ) {}

  async save(data: {
    userId: string;
    track: string;
    topic: string;
    difficulty: string;
    mode: string;
    verdict: string;
    xpAwarded: number;
  }): Promise<UserProgress> {
    const entry = this.repo.create(data);
    return this.repo.save(entry);
  }

  findByUserId(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<UserProgress[]> {
    return this.repo.find({
      where: { userId },
      order: { answeredAt: 'DESC' },
      take: limit,
      skip: offset,
    });
  }

  async getStatsByUserId(userId: string): Promise<TopicStat[]> {
    const rows = await this.repo
      .createQueryBuilder('p')
      .select('p.track', 'track')
      .addSelect('p.topic', 'topic')
      .addSelect(
        `SUM(CASE WHEN p.verdict = 'ВЕРНО' THEN 1 ELSE 0 END)`,
        'correct',
      )
      .addSelect(
        `SUM(CASE WHEN p.verdict = 'ЧАСТИЧНО' THEN 1 ELSE 0 END)`,
        'partial',
      )
      .addSelect(
        `SUM(CASE WHEN p.verdict = 'НЕВЕРНО' THEN 1 ELSE 0 END)`,
        'wrong',
      )
      .addSelect('SUM(p.xpAwarded)', 'totalXp')
      .where('p.userId = :userId', { userId })
      .groupBy('p.track')
      .addGroupBy('p.topic')
      .orderBy('p.track')
      .addOrderBy('p.topic')
      .getRawMany<TopicStat>();

    return rows.map((r) => ({
      track: r.track,
      topic: r.topic,
      correct: Number(r.correct),
      partial: Number(r.partial),
      wrong: Number(r.wrong),
      totalXp: Number(r.totalXp),
    }));
  }

  countByUserId(userId: string): Promise<number> {
    return this.repo.count({ where: { userId } });
  }
}
