const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3001';

export const buildQuestionUrl = (
  track: string,
  topic: string,
  difficulty: string,
  mode: string,
): string =>
  `${BACKEND}/drill/question?track=${encodeURIComponent(track)}&topic=${encodeURIComponent(topic)}&difficulty=${encodeURIComponent(difficulty)}&mode=${encodeURIComponent(mode)}`;

export const buildEvaluateUrl = (): string => `${BACKEND}/drill/evaluate`;
