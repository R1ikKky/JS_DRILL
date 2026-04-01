// ── Tracks ───────────────────────────────────────────────────────────────────
export type Track = 'js' | 'ts' | 'java-qa';

export const TRACK_LABELS: Record<Track, string> = {
  js: 'JavaScript',
  ts: 'TypeScript',
  'java-qa': 'Java QA',
};

// ── Topics ───────────────────────────────────────────────────────────────────
type JSTopicKey =
  | 'promises'
  | 'async-await'
  | 'array-methods'
  | 'string-methods'
  | 'number-methods'
  | 'big-o'
  | 'array-sorting'
  | 'data-structures'
  | 'mapset'
  | 'object'
  | 'recursion';

type TSTopicKey =
  | 'ts-types'
  | 'ts-generics'
  | 'ts-utility-types'
  | 'ts-narrowing'
  | 'ts-decorators'
  | 'ts-modules';

type JavaQATopicKey =
  | 'qa-theory'
  | 'qa-test-design'
  | 'java-oop'
  | 'java-collections'
  | 'java-streams'
  | 'java-ui-auto'
  | 'java-api-auto'
  | 'java-frameworks'
  | 'java-patterns'
  | 'java-databases'
  | 'java-infra'
  | 'java-docker';

export type Topic = JSTopicKey | TSTopicKey | JavaQATopicKey;

export const TOPIC_LABELS: Record<Topic, string> = {
  // JS
  promises: 'Promise / async',
  'async-await': 'Async / Await',
  'array-methods': 'Методы массивов',
  'string-methods': 'Методы строк',
  'number-methods': 'Методы чисел',
  'big-o': 'Big O нотация',
  'array-sorting': 'Сортировка массивов',
  'data-structures': 'Структуры данных',
  mapset: 'Map и Set',
  object: 'Object.keys/values',
  recursion: 'Рекурсия',
  // TS
  'ts-types': 'Types & Interfaces',
  'ts-generics': 'Generics',
  'ts-utility-types': 'Utility Types',
  'ts-narrowing': 'Type Narrowing',
  'ts-decorators': 'Decorators',
  'ts-modules': 'Modules & Namespaces',
  // Java QA
  'qa-theory': 'Теория тестирования и Процессы',
  'qa-test-design': 'Тест-дизайн и Анализ требований',
  'java-oop': 'Java Core: ООП и Синтаксис',
  'java-collections': 'Java Core: Collections Framework',
  'java-streams': 'Java: Stream API, Exceptions, Threads',
  'java-ui-auto': 'UI Автоматизация (Selenium/Selenide)',
  'java-api-auto': 'API Автоматизация (REST, HTTP, REST Assured)',
  'java-frameworks': 'Фреймворки (JUnit 5 / TestNG)',
  'java-patterns': 'Архитектура и Паттерны (Page Object, SOLID)',
  'java-databases': 'Базы данных и SQL',
  'java-infra': 'Инфраструктура: Git, Maven, CI/CD',
  'java-docker': 'Docker, Selenoid, Linux basics',
};

export const TRACK_TOPICS: Record<Track, Topic[]> = {
  js: [
    'promises',
    'async-await',
    'array-methods',
    'string-methods',
    'number-methods',
    'big-o',
    'array-sorting',
    'data-structures',
    'mapset',
    'object',
    'recursion',
  ],
  ts: [
    'ts-types',
    'ts-generics',
    'ts-utility-types',
    'ts-narrowing',
    'ts-decorators',
    'ts-modules',
  ],
  'java-qa': [
    'qa-theory',
    'qa-test-design',
    'java-oop',
    'java-collections',
    'java-streams',
    'java-ui-auto',
    'java-api-auto',
    'java-frameworks',
    'java-patterns',
    'java-databases',
    'java-infra',
    'java-docker',
  ],
};

// Topics that support theory mode (conceptual Q&A instead of code writing)
export const THEORY_TOPICS = new Set<Topic>([
  // JS conceptual topics
  'promises',
  'async-await',
  'big-o',
  'data-structures',
  // All TS topics
  'ts-types',
  'ts-generics',
  'ts-utility-types',
  'ts-narrowing',
  'ts-decorators',
  'ts-modules',
  // All Java QA topics
  'qa-theory',
  'qa-test-design',
  'java-oop',
  'java-collections',
  'java-streams',
  'java-ui-auto',
  'java-api-auto',
  'java-frameworks',
  'java-patterns',
  'java-databases',
  'java-infra',
  'java-docker',
]);

// ── Mode ─────────────────────────────────────────────────────────────────────
export type Mode = 'drill' | 'theory';

// ── Difficulty ───────────────────────────────────────────────────────────────
export type Difficulty = 'easy' | 'medium' | 'hard' | 'mixed';

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'EASY',
  medium: 'MEDIUM',
  hard: 'HARD',
  mixed: 'MIX',
};

// ── Verdict ───────────────────────────────────────────────────────────────────
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
  track: Track;
  mode: Mode;
  topic: Topic | null;
  difficulty: Difficulty;
  question: string;
  answer: string;
  feedback: string;
  verdict: Verdict;
  score: DrillScore;
}
