import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserService } from '../user/user.service';
import { IRefreshTokenRepository } from './repositories/refresh-token.repository.interface';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entities/user.entity';

const REFRESH_TOKEN_COOKIE = 'refreshToken';
const REFRESH_EXPIRES_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: IRefreshTokenRepository,
    private readonly dataSource: DataSource,
  ) {}

  async register(
    dto: RegisterDto,
    req: Request,
    res: Response,
  ): Promise<{ accessToken: string; user: UserPublicDto }> {
    const existing = await this.userService.findByEmail(dto.email);
    if (existing) throw new ConflictException('Email already in use');

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.userService.create({
      email: dto.email,
      passwordHash,
      username: dto.username ?? 'anonymous',
    });

    return this.issueSession(user, req, res);
  }

  async login(
    dto: LoginDto,
    req: Request,
    res: Response,
  ): Promise<{ accessToken: string; user: UserPublicDto }> {
    const user = await this.userService.findByEmail(dto.email);
    const passwordMatch =
      user && (await bcrypt.compare(dto.password, user.passwordHash));

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.issueSession(user, req, res);
  }

  async refresh(
    req: Request,
    res: Response,
  ): Promise<{ accessToken: string }> {
    const oldToken: string | undefined = (req.cookies as Record<string, string>)[REFRESH_TOKEN_COOKIE];
    if (!oldToken) throw new UnauthorizedException('No refresh token');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const stored = await this.refreshTokenRepository.findByToken(
        oldToken,
        queryRunner.manager,
      );

      if (!stored || stored.expiresAt < new Date()) {
        await queryRunner.rollbackTransaction();
        throw new UnauthorizedException('Invalid or expired refresh token');
      }

      await this.refreshTokenRepository.deleteByToken(
        oldToken,
        queryRunner.manager,
      );
      await queryRunner.commitTransaction();

      const accessToken = this.signAccessToken(stored.userId);
      const newRefreshToken = await this.saveRefreshToken(
        stored.userId,
        req,
      );

      this.setRefreshCookie(res, newRefreshToken);
      return { accessToken };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      if (e instanceof UnauthorizedException) throw e;
      throw new UnauthorizedException('Token refresh failed');
    } finally {
      await queryRunner.release();
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    const token: string | undefined = (req.cookies as Record<string, string>)[REFRESH_TOKEN_COOKIE];
    if (token) {
      await this.refreshTokenRepository.deleteByToken(token);
    }
    res.clearCookie(REFRESH_TOKEN_COOKIE);
  }

  private async issueSession(
    user: User,
    req: Request,
    res: Response,
  ): Promise<{ accessToken: string; user: UserPublicDto }> {
    const accessToken = this.signAccessToken(user.id);
    const refreshToken = await this.saveRefreshToken(user.id, req);
    this.setRefreshCookie(res, refreshToken);

    return { accessToken, user: toPublicDto(user) };
  }

  private signAccessToken(userId: string): string {
    return this.jwtService.sign({ userId });
  }

  private async saveRefreshToken(userId: string, req: Request): Promise<string> {
    const token = this.jwtService.sign(
      { userId },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '90d',
      },
    );
    const expiresAt = new Date(Date.now() + REFRESH_EXPIRES_MS);
    const userAgent = (req.headers['user-agent'] as string) ?? null;
    const ip = (req.ip ?? null);

    await this.refreshTokenRepository.create({
      token,
      userId,
      userAgent: userAgent?.slice(0, 200) ?? null,
      ip: ip?.slice(0, 45) ?? null,
      expiresAt,
    });

    return token;
  }

  private setRefreshCookie(res: Response, token: string): void {
    res.cookie(REFRESH_TOKEN_COOKIE, token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: REFRESH_EXPIRES_MS,
    });
  }
}

export interface UserPublicDto {
  id: string;
  email: string;
  username: string;
  level: number;
  xp: number;
  preferredTheme: string;
}

function toPublicDto(user: User): UserPublicDto {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    level: user.level,
    xp: user.xp,
    preferredTheme: user.preferredTheme,
  };
}
