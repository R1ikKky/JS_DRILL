export type Topic =
  | 'promises'
  | 'strings'
  | 'arrays'
  | 'mapset'
  | 'object'
  | 'recursion';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'mixed';

export type Verdict = 'ВЕРНО' | 'ЧАСТИЧНО' | 'НЕВЕРНО' | null;

export interface DrillScore {
  correct: number;
  wrong: number;
  skipped: number;
}

export interface DrillState {
  phase:
    | 'idle'
    | 'loading-question'
    | 'answering'
    | 'evaluating'
    | 'feedback';
  topic: Topic | null;
  difficulty: Difficulty;
  question: string;
  answer: string;
  feedback: string;
  verdict: Verdict;
  score: DrillScore;
}

export const TOPIC_LABELS: Record<Topic, string> = {
  promises: 'Promise / async',
  strings: 'Строки JS',
  arrays: 'Методы массивов',
  mapset: 'Map и Set',
  object: 'Object.keys/values',
  recursion: 'Рекурсия',
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'EASY',
  medium: 'MEDIUM',
  hard: 'HARD',
  mixed: 'MIX',
};
