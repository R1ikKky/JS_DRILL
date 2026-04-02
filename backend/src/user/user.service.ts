import { Injectable, NotFoundException } from '@nestjs/common';
import { IUsersRepository } from './repositories/users.repository.interface';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  findById(id: string): Promise<User | null> {
    return this.usersRepository.findById(id);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  create(data: {
    email: string;
    passwordHash: string;
    username: string;
  }): Promise<User> {
    return this.usersRepository.create(data);
  }

  async updateXpAndLevel(
    userId: string,
    xp: number,
    level: number,
  ): Promise<void> {
    return this.usersRepository.updateXpAndLevel(userId, xp, level);
  }

  async updateTheme(userId: string, theme: string): Promise<void> {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return this.usersRepository.updateTheme(userId, theme);
  }

  async getOrThrow(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
