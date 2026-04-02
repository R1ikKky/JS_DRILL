import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UsersRepository } from './repositories/users.repository';
import { IUsersRepository } from './repositories/users.repository.interface';
import { ProfileController } from './profile.controller';
import { ProgressModule } from '../progress/progress.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ProgressModule],
  controllers: [ProfileController],
  providers: [
    UserService,
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
  ],
  exports: [UserService, IUsersRepository],
})
export class UserModule {}
