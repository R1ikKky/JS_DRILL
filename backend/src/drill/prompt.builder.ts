export const TOPICS = {
  promises: 'Promise / async-await',
  strings: 'Строки JS',
  arrays: 'Методы массивов',
  mapset: 'Map и Set',
  object: 'Object.keys / values / entries',
  recursion: 'Рекурсия и стек вызовов',
} as const;

export type TopicKey = keyof typeof TOPICS;

const DIFFICULTY_MAP: Record<string, string> = {
  easy: 'базовый',
  medium: 'средний',
  hard: 'сложный',
  mixed: 'любой',
};

export function buildQuestionPrompt(topic: string, difficulty: string): string {
  const topicLabel = TOPICS[topic as TopicKey] ?? topic;
  const difficultyLabel = DIFFICULTY_MAP[difficulty] ?? difficulty;

  return `Ты — строгий интервьюер по JavaScript. Составь одно интервью-задание на тему "${topicLabel}" уровня сложности "${difficultyLabel}".

Правила:
1. Вопрос должен быть на русском языке.
2. Случайно выбери ОДИН из следующих форматов:
   - "Что выведет этот код?" с хитрым фрагментом кода (частые ловушки: замыкания, hoisting, порядок выполнения промисов, коварный typeof)
   - "Напиши функцию, которая..." с конкретным техническим требованием
   - Концептуальный вопрос, где распространённое заблуждение является ловушкой
3. Если используется код — оберни его ТОЧНО в маркеры [CODE]...[/CODE] без пробелов у скобок.
4. Вопрос должен быть конкретным и сфокусированным — не более 150 слов.
5. Не давай подсказок и не упоминай правильный ответ.
6. Начни сразу с вопроса — без преамбул типа "Вот вопрос:" или "Конечно!".`;
}

export function buildEvaluationPrompt(
  topic: string,
  difficulty: string,
  question: string,
  answer: string,
): string {
  const topicLabel = TOPICS[topic as TopicKey] ?? topic;
  void difficulty;

  return `Ты — строгий технический интервьюер по JavaScript. Оцени ответ кандидата на вопрос по теме "${topicLabel}".

Вопрос: ${question}

Ответ кандидата: ${answer}

Правила оценки:
1. Первая строка твоего ответа должна быть ТОЛЬКО одним из трёх слов: ВЕРНО, ЧАСТИЧНО или НЕВЕРНО.
2. Оставь пустую строку, затем напиши 2–4 предложения объяснения на русском языке.
3. Будь строгим и техническим. Указывай конкретные ошибки, если они есть.
4. Если ответ неверный или неполный — покажи правильный ответ или правильный код.
5. Не повторяй вопрос в ответе.`;
}
