import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProgress } from './entities/user-progress.entity';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { IProgressRepository } from './repositories/progress.repository.interface';
import { ProgressRepository } from './repositories/progress.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserProgress])],
  controllers: [ProgressController],
  providers: [
    ProgressService,
    {
      provide: IProgressRepository,
      useClass: ProgressRepository,
    },
  ],
  exports: [ProgressService],
})
export class ProgressModule {}
