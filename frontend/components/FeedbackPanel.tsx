'use client';

import { Verdict } from '../types/drill';

const VERDICT_CONFIG: Record<
  NonNullable<Verdict>,
  { color: string; bg: string; label: string }
> = {
  ВЕРНО: {
    color: 'var(--green)',
    bg: 'rgba(0,255,136,0.07)',
    label: '✓ ВЕРНО',
  },
  ЧАСТИЧНО: {
    color: 'var(--amber)',
    bg: 'rgba(255,170,0,0.07)',
    label: '~ ЧАСТИЧНО',
  },
  НЕВЕРНО: {
    color: 'var(--red)',
    bg: 'rgba(255,68,102,0.07)',
    label: '✗ НЕВЕРНО',
  },
};

interface FeedbackPanelProps {
  feedback: string;
  verdict: Verdict;
  isStreaming: boolean;
  className?: string;
}

export default function FeedbackPanel({
  feedback,
  verdict,
  isStreaming,
  className = '',
}: FeedbackPanelProps) {
  const config = verdict ? VERDICT_CONFIG[verdict] : null;
  const borderColor = config?.color ?? 'var(--muted)';

  // Remove the first line (verdict word) from display — we render it as a badge
  const lines = feedback.split('\n');
  const bodyLines = lines.slice(1).join('\n').trimStart();

  return (
    <div
      className={`border bg-[var(--panel)] p-5 ${className}`}
      style={{
        borderColor,
        borderLeftWidth: '3px',
        backgroundColor: config?.bg ?? 'var(--panel)',
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className="text-[10px] tracking-[0.25em] uppercase font-bold px-2 py-1"
          style={{
            color: borderColor,
            border: `1px solid ${borderColor}`,
            backgroundColor: `color-mix(in srgb, ${borderColor} 12%, transparent)`,
          }}
        >
          {config ? config.label : 'ANALYSING'}
        </span>
        {isStreaming && (
          <span className="text-[10px] text-[var(--muted)] tracking-[0.2em] uppercase loading-dots">
            ANALYSING
          </span>
        )}
      </div>

      <div className="text-[var(--text)] text-sm leading-relaxed whitespace-pre-wrap">
        {bodyLines}
        {isStreaming && (
          <span className="cursor-blink" style={{ color: borderColor }}>
            ▋
          </span>
        )}
      </div>
    </div>
  );
}
