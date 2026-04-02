import { User } from '../entities/user.entity';

export abstract class IUsersRepository {
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(data: {
    email: string;
    passwordHash: string;
    username: string;
  }): Promise<User>;
  abstract updateXpAndLevel(
    userId: string,
    xp: number,
    level: number,
  ): Promise<void>;
  abstract updateTheme(userId: string, theme: string): Promise<void>;
}
