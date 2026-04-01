// ── Topic label maps ──────────────────────────────────────────────────────────

const JS_TOPICS: Record<string, string> = {
  promises: 'Promise / async-await',
  'async-await': 'Async / Await',
  'array-methods': 'Методы массивов',
  'string-methods': 'Методы строк',
  'number-methods': 'Методы чисел',
  'big-o': 'Big O нотация',
  'array-sorting': 'Сортировка массивов',
  'data-structures': 'Структуры данных',
  mapset: 'Map и Set',
  object: 'Object.keys / values / entries',
  recursion: 'Рекурсия и стек вызовов',
};

const TS_TOPICS: Record<string, string> = {
  'ts-types': 'Types & Interfaces',
  'ts-generics': 'Generics',
  'ts-utility-types': 'Utility Types (Partial, Pick, Omit, Record...)',
  'ts-narrowing': 'Type Narrowing & Type Guards',
  'ts-decorators': 'Decorators',
  'ts-modules': 'Modules & Namespaces',
};

const JAVA_QA_TOPICS: Record<string, string> = {
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

function getTopicLabel(track: string, topic: string): string {
  if (track === 'ts') return TS_TOPICS[topic] ?? topic;
  if (track === 'java-qa') return JAVA_QA_TOPICS[topic] ?? topic;
  return JS_TOPICS[topic] ?? topic;
}

// ── Difficulty map ────────────────────────────────────────────────────────────

const DIFFICULTY_MAP: Record<string, string> = {
  easy: 'базовый',
  medium: 'средний',
  hard: 'сложный',
  mixed: 'любой',
};

// ── Question prompts ──────────────────────────────────────────────────────────

export function buildQuestionPrompt(
  track: string,
  topic: string,
  difficulty: string,
  mode: string,
): string {
  const topicLabel = getTopicLabel(track, topic);
  const difficultyLabel = DIFFICULTY_MAP[difficulty] ?? difficulty;

  if (track === 'java-qa') {
    if (mode === 'theory') {
      return `Ты — строгий интервьюер по Java-автоматизации тестирования. Составь один теоретический вопрос на тему "${topicLabel}" уровня сложности "${difficultyLabel}".

Правила:
1. Вопрос должен быть на русском языке.
2. Выбери ОДИН из форматов:
   - "В чём разница между X и Y?"
   - "Что такое X? Когда его использовать?"
   - "Объясни принцип/паттерн X"
   - Вопрос-ловушка, в котором распространённое заблуждение является ошибкой
3. Не требуй написания кода — только концептуальный ответ. Короткий пример кода в [CODE]...[/CODE] допустим для иллюстрации вопроса.
4. Вопрос не более 100 слов.
5. Не давай подсказок и не упоминай правильный ответ.
6. Начни сразу с вопроса — без преамбул.`;
    }
    return `Ты — строгий интервьюер по Java-автоматизации тестирования. Составь одно интервью-задание на тему "${topicLabel}" уровня сложности "${difficultyLabel}".

Правила:
1. Вопрос должен быть на русском языке.
2. Случайно выбери ОДИН из следующих форматов:
   - "Что выведет этот код?" с хитрым фрагментом кода на Java
   - "Напиши код/тест, который..." с конкретным техническим требованием
   - Концептуальный вопрос, где распространённое заблуждение является ловушкой
3. Если используется код — оберни его ТОЧНО в маркеры [CODE]...[/CODE] без пробелов у скобок.
4. Вопрос должен быть конкретным и сфокусированным — не более 150 слов.
5. Не давай подсказок и не упоминай правильный ответ.
6. Начни сразу с вопроса — без преамбул типа "Вот вопрос:" или "Конечно!".`;
  }

  if (mode === 'theory') {
    const lang = track === 'ts' ? 'TypeScript' : 'JavaScript';
    return `Ты — строгий интервьюер по ${lang}. Составь один теоретический вопрос на тему "${topicLabel}" уровня сложности "${difficultyLabel}".

Правила:
1. Вопрос должен быть на русском языке.
2. Выбери ОДИН из форматов:
   - "В чём разница между X и Y?"
   - "Что такое X? Когда его использовать?"
   - "Объясни принцип X"
   - Вопрос-ловушка, в котором распространённое заблуждение является ошибкой
3. Не требуй написания кода — только концептуальный ответ. Короткий иллюстративный пример в [CODE]...[/CODE] допустим.
4. Вопрос не более 100 слов.
5. Не давай подсказок и не упоминай правильный ответ.
6. Начни сразу с вопроса — без преамбул.`;
  }

  // JS or TS drill mode
  const lang = track === 'ts' ? 'TypeScript' : 'JavaScript';
  return `Ты — строгий интервьюер по ${lang}. Составь одно интервью-задание на тему "${topicLabel}" уровня сложности "${difficultyLabel}".

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

// ── Evaluation prompts ────────────────────────────────────────────────────────

export function buildEvaluationPrompt(
  track: string,
  topic: string,
  difficulty: string,
  question: string,
  answer: string,
  mode: string,
): string {
  const topicLabel = getTopicLabel(track, topic);
  void difficulty;

  if (track === 'java-qa') {
    const context = mode === 'theory'
      ? 'концептуальное понимание темы'
      : 'знание Java и автоматизации тестирования';
    return `Ты — строгий технический интервьюер по Java-автоматизации тестирования. Оцени ответ кандидата на вопрос по теме "${topicLabel}".

Вопрос: ${question}

Ответ кандидата: ${answer}

Правила оценки (${context}):
1. Первая строка твоего ответа должна быть ТОЛЬКО одним из трёх слов: ВЕРНО, ЧАСТИЧНО или НЕВЕРНО.
2. Оставь пустую строку, затем напиши 2–4 предложения объяснения на русском языке.
3. Будь строгим и техническим. Указывай конкретные ошибки, если они есть.
4. Если ответ неверный или неполный — покажи правильный ответ или правильный код.
5. Не повторяй вопрос в ответе.`;
  }

  const lang = track === 'ts' ? 'TypeScript' : 'JavaScript';
  const context = mode === 'theory'
    ? 'концептуальное понимание'
    : 'техническую точность ответа';
  return `Ты — строгий технический интервьюер по ${lang}. Оцени ответ кандидата на вопрос по теме "${topicLabel}".

Вопрос: ${question}

Ответ кандидата: ${answer}

Правила оценки (${context}):
1. Первая строка твоего ответа должна быть ТОЛЬКО одним из трёх слов: ВЕРНО, ЧАСТИЧНО или НЕВЕРНО.
2. Оставь пустую строку, затем напиши 2–4 предложения объяснения на русском языке.
3. Будь строгим и техническим. Указывай конкретные ошибки, если они есть.
4. Если ответ неверный или неполный — покажи правильный ответ или правильный код.
5. Не повторяй вопрос в ответе.`;
}
