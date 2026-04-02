import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';
import { IRefreshTokenRepository } from './refresh-token.repository.interface';

@Injectable()
export class RefreshTokenRepository implements IRefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly repo: Repository<RefreshToken>,
  ) {}

  async create(data: {
    token: string;
    userId: string;
    userAgent: string | null;
    ip: string | null;
    expiresAt: Date;
  }): Promise<RefreshToken> {
    const rt = this.repo.create(data);
    return this.repo.save(rt);
  }

  findByToken(
    token: string,
    manager?: EntityManager,
  ): Promise<RefreshToken | null> {
    const repo = manager
      ? manager.getRepository(RefreshToken)
      : this.repo;
    return repo.findOne({ where: { token }, relations: ['user'] });
  }

  async deleteByToken(
    token: string,
    manager?: EntityManager,
  ): Promise<void> {
    const repo = manager
      ? manager.getRepository(RefreshToken)
      : this.repo;
    await repo.delete({ token });
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.repo.delete({ userId });
  }
}
