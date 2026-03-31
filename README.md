# JS DRILL — JavaScript Interview Simulator

A real-time JavaScript live coding drill app powered by **DeepSeek AI**. Questions stream token by token. Submit your answer, get streamed feedback with a verdict.

---

## Prerequisites

- **Node.js 18+** and npm
- A **DeepSeek API key** — get one at [platform.deepseek.com](https://platform.deepseek.com)

---

## Installation

### 1. Backend (NestJS)

```bash
cd backend
npm install
cp .env.example .env
# Open .env and set your DEEPSEEK_API_KEY
```

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
cp .env.local.example .env.local
# Optional: edit NEXT_PUBLIC_BACKEND_URL if your backend runs on a different port
```

---

## Environment Variables

### `backend/.env`

```env
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PORT=3001
```

### `frontend/.env.local`

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

---

## Running

Open two terminals:

**Terminal 1 — Backend**

```bash
cd backend
npm run start:dev
# Starts on http://localhost:3001
```

**Terminal 2 — Frontend**

```bash
cd frontend
npm run dev
# Starts on http://localhost:3000
```

Open **http://localhost:3000**.

---

## How It Works

1. Select a **topic** (6 JS topics available)
2. Choose a **difficulty** (Easy / Medium / Hard / Mix)
3. Click **FIRE QUESTION** → question streams in character by character
4. Type your answer in the textarea (`Ctrl+Enter` or click **SUBMIT ANSWER**)
5. AI evaluates and streams back a verdict (`ВЕРНО` / `ЧАСТИЧНО` / `НЕВЕРНО`) + explanation
6. Score updates in the header. Click **NEXT QUESTION** to drill again.

---

## Topics

| Key | Topic |
|---|---|
| `promises` | Promise / async-await |
| `strings` | Строки JS |
| `arrays` | Методы массивов |
| `mapset` | Map и Set |
| `object` | Object.keys / values / entries |
| `recursion` | Рекурсия и стек вызовов |

---

## Architecture

```
backend/                  # NestJS 10
  src/
    drill/
      drill.controller.ts  # GET /drill/question (SSE), POST /drill/evaluate (SSE)
      drill.service.ts     # DeepSeek streaming via openai package
      drill.dto.ts         # class-validator DTOs
      prompt.builder.ts    # Pure prompt construction functions
    config/
      deepseek.config.ts   # OpenAI client pointed at DeepSeek base URL

frontend/                 # Next.js 14 App Router
  app/page.tsx            # Main drill UI
  hooks/
    useDrill.ts           # useReducer state machine (all phases)
    useSSE.ts             # fetch + ReadableStream SSE consumer
  components/             # TopicSelector, DifficultySelector, QuestionPanel,
                          # AnswerInput, FeedbackPanel, ScoreBar
```

**Key design decisions:**
- **Stateless** — no database, no persistence; all state lives in React
- **SSE via fetch** — supports both GET and POST streaming without EventSource limitations
- **DeepSeek** — accessed via the `openai` npm package with a custom `baseURL`
- **POST + SSE** — NestJS `@Sse()` only supports GET, so `/drill/evaluate` uses `@Post()` + raw `@Res()` Express streaming
