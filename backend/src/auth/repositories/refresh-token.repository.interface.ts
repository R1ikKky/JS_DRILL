import { EntityManager } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';

export abstract class IRefreshTokenRepository {
  abstract create(data: {
    token: string;
    userId: string;
    userAgent: string | null;
    ip: string | null;
    expiresAt: Date;
  }): Promise<RefreshToken>;

  abstract findByToken(
    token: string,
    manager?: EntityManager,
  ): Promise<RefreshToken | null>;

  abstract deleteByToken(
    token: string,
    manager?: EntityManager,
  ): Promise<void>;

  abstract deleteByUserId(userId: string): Promise<void>;
}
