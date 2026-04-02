import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { IUsersRepository } from './users.repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  findById(id: string): Promise<User | null> {
    return this.repo.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repo.findOneBy({ email });
  }

  async create(data: {
    email: string;
    passwordHash: string;
    username: string;
  }): Promise<User> {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async updateXpAndLevel(
    userId: string,
    xp: number,
    level: number,
  ): Promise<void> {
    await this.repo.update(userId, { xp, level });
  }

  async updateTheme(userId: string, theme: string): Promise<void> {
    await this.repo.update(userId, { preferredTheme: theme });
  }
}
