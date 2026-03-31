'use client';

interface QuestionPart {
  type: 'text' | 'code';
  content: string;
}

function parseQuestion(text: string): QuestionPart[] {
  const parts: QuestionPart[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    const codeStart = remaining.indexOf('[CODE]');
    if (codeStart === -1) {
      parts.push({ type: 'text', content: remaining });
      break;
    }
    if (codeStart > 0) {
      parts.push({ type: 'text', content: remaining.slice(0, codeStart) });
    }
    const afterOpen = remaining.slice(codeStart + 6);
    const codeEnd = afterOpen.indexOf('[/CODE]');
    if (codeEnd === -1) {
      parts.push({ type: 'code', content: afterOpen });
      break;
    }
    parts.push({ type: 'code', content: afterOpen.slice(0, codeEnd) });
    remaining = afterOpen.slice(codeEnd + 7);
  }

  return parts;
}

interface QuestionPanelProps {
  question: string;
  isStreaming: boolean;
  className?: string;
}

export default function QuestionPanel({
  question,
  isStreaming,
  className = '',
}: QuestionPanelProps) {
  const parts = parseQuestion(question);

  return (
    <div
      className={`question-panel ${className}`}
      style={{
        border: `var(--border-width) solid var(--border)`,
        borderRadius: 'var(--radius)',
        background: 'var(--panel)',
        padding: '20px',
        boxShadow: 'var(--shadow-sm)',
        transition: 'background 0.35s, border-color 0.35s',
      }}
    >
      <div
        className="text-[10px] tracking-[0.25em] uppercase mb-4 flex items-center gap-2"
        style={{ color: 'var(--muted)' }}
      >
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{
            backgroundColor: isStreaming ? 'var(--accent)' : 'var(--positive)',
          }}
        />
        {isStreaming ? 'GENERATING' : 'QUESTION'}
      </div>

      <div
        className="question-text leading-relaxed text-sm"
        style={{ color: 'var(--text)', fontFamily: 'var(--font-body)' }}
      >
        {question.length === 0 && isStreaming ? (
          <span className="cursor-blink" style={{ color: 'var(--accent)' }}>
            ▋
          </span>
        ) : (
          <>
            {parts.map((part, i) =>
              part.type === 'code' ? (
                <pre
                  key={i}
                  className="code-block my-3 p-4 overflow-x-auto leading-relaxed whitespace-pre"
                  style={{
                    background: 'var(--code-bg)',
                    border: `var(--border-width) solid var(--border)`,
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--code-color)',
                    fontSize: '12px',
                    fontFamily: 'var(--code-font)',
                  }}
                >
                  {part.content}
                </pre>
              ) : (
                <span key={i} className="whitespace-pre-wrap">
                  {part.content}
                </span>
              ),
            )}
            {isStreaming && (
              <span
                className="cursor-blink"
                style={{ color: 'var(--accent)' }}
              >
                ▋
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
