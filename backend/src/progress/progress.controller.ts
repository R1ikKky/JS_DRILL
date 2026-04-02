import { Controller, Get, Query } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { UserId } from '../common/decorators/user-id.decorator';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get('stats')
  getStats(@UserId() userId: string) {
    return this.progressService.getStatsByUserId(userId);
  }

  @Get('history')
  async getHistory(
    @UserId() userId: string,
    @Query('limit') limit = 20,
    @Query('offset') offset = 0,
  ) {
    const [items, total] = await Promise.all([
      this.progressService.findByUserId(userId, Number(limit), Number(offset)),
      this.progressService.countByUserId(userId),
    ]);
    return { items, total };
  }
}
