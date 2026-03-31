import { IsEnum, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export enum TopicEnum {
  promises = 'promises',
  strings = 'strings',
  arrays = 'arrays',
  mapset = 'mapset',
  object = 'object',
  recursion = 'recursion',
}

export enum DifficultyEnum {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
  mixed = 'mixed',
}

export class QuestionQueryDto {
  @IsEnum(TopicEnum)
  topic!: TopicEnum;

  @IsEnum(DifficultyEnum)
  difficulty!: DifficultyEnum;
}

export class EvaluateBodyDto {
  @IsString()
  @IsNotEmpty()
  topic!: string;

  @IsString()
  @IsNotEmpty()
  difficulty!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  question!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10000)
  answer!: string;
}
