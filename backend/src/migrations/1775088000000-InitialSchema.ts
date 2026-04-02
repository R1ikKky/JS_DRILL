import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1775088000000 implements MigrationInterface {
  name = 'InitialSchema1775088000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id"             uuid                     NOT NULL DEFAULT gen_random_uuid(),
        "email"          character varying(254)   NOT NULL,
        "passwordHash"   character varying(72)    NOT NULL,
        "username"       character varying(40)    NOT NULL DEFAULT 'anonymous',
        "xp"             integer                  NOT NULL DEFAULT 0,
        "level"          integer                  NOT NULL DEFAULT 1,
        "preferredTheme" character varying(20)    NOT NULL DEFAULT 'console',
        "createdAt"      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt"      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_users_email"  UNIQUE ("email"),
        CONSTRAINT "PK_users"        PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "refresh_tokens" (
        "id"        uuid                     NOT NULL DEFAULT gen_random_uuid(),
        "token"     text                     NOT NULL,
        "userId"    uuid                     NOT NULL,
        "userAgent" character varying(200),
        "ip"        character varying(45),
        "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_refresh_tokens_token" UNIQUE ("token"),
        CONSTRAINT "PK_refresh_tokens"       PRIMARY KEY ("id"),
        CONSTRAINT "FK_refresh_tokens_user"  FOREIGN KEY ("userId")
          REFERENCES "users"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "user_progress" (
        "id"         uuid                     NOT NULL DEFAULT gen_random_uuid(),
        "userId"     uuid                     NOT NULL,
        "track"      character varying(20)    NOT NULL,
        "topic"      character varying(50)    NOT NULL,
        "difficulty" character varying(10)    NOT NULL,
        "mode"       character varying(10)    NOT NULL,
        "verdict"    character varying(15)    NOT NULL,
        "xpAwarded"  integer                  NOT NULL DEFAULT 0,
        "answeredAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_user_progress"       PRIMARY KEY ("id"),
        CONSTRAINT "FK_user_progress_user"  FOREIGN KEY ("userId")
          REFERENCES "users"("id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_progress"`);
    await queryRunner.query(`DROP TABLE "refresh_tokens"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
