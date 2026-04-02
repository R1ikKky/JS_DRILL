import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { DrillModule } from './drill/drill.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProgressModule } from './progress/progress.module';
import { User } from './user/entities/user.entity';
import { RefreshToken } from './auth/entities/refresh-token.entity';
import { UserProgress } from './progress/entities/user-progress.entity';
import { AuthGuard } from './common/guards/auth.guard';
import { InitialSchema1775088000000 } from './migrations/1775088000000-InitialSchema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get<string>('DB_HOST', 'localhost'),
        port: cfg.get<number>('DB_PORT', 5433),
        username: cfg.get<string>('DB_USER', 'postgres'),
        password: cfg.get<string>('DB_PASS', 'postgres'),
        database: cfg.get<string>('DB_NAME', 'jsdrill'),
        entities: [User, RefreshToken, UserProgress],
        migrations: [InitialSchema1775088000000],
        migrationsTableName: 'typeorm_migrations',
        migrationsRun: true,
      }),
    }),
    UserModule,
    AuthModule,
    ProgressModule,
    DrillModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
