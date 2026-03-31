const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3001';

export const buildQuestionUrl = (topic: string, difficulty: string): string =>
  `${BACKEND}/drill/question?topic=${encodeURIComponent(topic)}&difficulty=${encodeURIComponent(difficulty)}`;

export const buildEvaluateUrl = (): string => `${BACKEND}/drill/evaluate`;
