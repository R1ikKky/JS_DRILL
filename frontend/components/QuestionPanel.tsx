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
      // Stream hasn't delivered [/CODE] yet — show partial code block
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
      className={`border border-[var(--border)] bg-[var(--panel)] p-5 ${className}`}
    >
      <div className="text-[10px] text-[var(--muted)] tracking-[0.25em] uppercase mb-4 flex items-center gap-2">
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{ backgroundColor: isStreaming ? 'var(--cyan)' : 'var(--green)' }}
        />
        {isStreaming ? 'GENERATING' : 'QUESTION'}
      </div>

      <div className="text-[var(--text)] leading-relaxed text-sm">
        {question.length === 0 && isStreaming ? (
          <span className="cursor-blink text-[var(--cyan)]">▋</span>
        ) : (
          <>
            {parts.map((part, i) =>
              part.type === 'code' ? (
                <pre
                  key={i}
                  className="my-3 p-4 bg-[#060a0e] border border-[var(--border)] text-[var(--cyan)] overflow-x-auto text-xs leading-relaxed whitespace-pre"
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
              <span className="cursor-blink text-[var(--cyan)]">▋</span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
