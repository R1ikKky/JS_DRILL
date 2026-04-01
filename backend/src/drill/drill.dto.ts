import { IsEnum, IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export enum TrackEnum {
  js = 'js',
  ts = 'ts',
  'java-qa' = 'java-qa',
}

export enum ModeEnum {
  drill = 'drill',
  theory = 'theory',
}

export enum TopicEnum {
  // JS topics
  promises = 'promises',
  'async-await' = 'async-await',
  'array-methods' = 'array-methods',
  'string-methods' = 'string-methods',
  'number-methods' = 'number-methods',
  'big-o' = 'big-o',
  'array-sorting' = 'array-sorting',
  'data-structures' = 'data-structures',
  mapset = 'mapset',
  object = 'object',
  recursion = 'recursion',
  // TS topics
  'ts-types' = 'ts-types',
  'ts-generics' = 'ts-generics',
  'ts-utility-types' = 'ts-utility-types',
  'ts-narrowing' = 'ts-narrowing',
  'ts-decorators' = 'ts-decorators',
  'ts-modules' = 'ts-modules',
  // Java QA topics
  'qa-theory' = 'qa-theory',
  'qa-test-design' = 'qa-test-design',
  'java-oop' = 'java-oop',
  'java-collections' = 'java-collections',
  'java-streams' = 'java-streams',
  'java-ui-auto' = 'java-ui-auto',
  'java-api-auto' = 'java-api-auto',
  'java-frameworks' = 'java-frameworks',
  'java-patterns' = 'java-patterns',
  'java-databases' = 'java-databases',
  'java-infra' = 'java-infra',
  'java-docker' = 'java-docker',
}

export enum DifficultyEnum {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
  mixed = 'mixed',
}

export class QuestionQueryDto {
  @IsEnum(TrackEnum)
  track!: TrackEnum;

  @IsEnum(TopicEnum)
  topic!: TopicEnum;

  @IsEnum(DifficultyEnum)
  difficulty!: DifficultyEnum;

  @IsEnum(ModeEnum)
  @IsOptional()
  mode?: ModeEnum;
}

export class EvaluateBodyDto {
  @IsString()
  @IsNotEmpty()
  track!: string;

  @IsString()
  @IsNotEmpty()
  topic!: string;

  @IsString()
  @IsNotEmpty()
  difficulty!: string;

  @IsString()
  @IsNotEmpty()
  mode!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  question!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10000)
  answer!: string;
}
