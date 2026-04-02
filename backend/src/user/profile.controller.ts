import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { IsIn, IsString } from 'class-validator';
import { UserService } from './user.service';
import { ProgressService } from '../progress/progress.service';
import { UserId } from '../common/decorators/user-id.decorator';
import { xpForNextLevel } from '../progress/xp.util';

class UpdateThemeDto {
  @IsString()
  @IsIn(['console', 'aesthetic', 'rich', 'sketch', 'aurora'])
  theme: string;
}

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly userService: UserService,
    private readonly progressService: ProgressService,
  ) {}

  @Get('me')
  async getMe(@UserId() userId: string) {
    const user = await this.userService.getOrThrow(userId);
    const [stats, totalAnswered] = await Promise.all([
      this.progressService.getStatsByUserId(userId),
      this.progressService.countByUserId(userId),
    ]);

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      level: user.level,
      xp: user.xp,
      xpForNextLevel: xpForNextLevel(user.level),
      preferredTheme: user.preferredTheme,
      totalAnswered,
      stats,
    };
  }

  @Patch('theme')
  @HttpCode(HttpStatus.OK)
  async updateTheme(
    @UserId() userId: string,
    @Body() dto: UpdateThemeDto,
  ) {
    await this.userService.updateTheme(userId, dto.theme);
    return { success: true };
  }
}
