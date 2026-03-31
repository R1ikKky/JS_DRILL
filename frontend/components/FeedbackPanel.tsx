'use client';

import { Verdict } from '../types/drill';

const VERDICT_CONFIG: Record<
  NonNullable<Verdict>,
  { colorVar: string; label: string }
> = {
  ВЕРНО:    { colorVar: 'var(--positive)', label: '✓ ВЕРНО' },
  ЧАСТИЧНО: { colorVar: 'var(--accent2)',  label: '~ ЧАСТИЧНО' },
  НЕВЕРНО:  { colorVar: 'var(--negative)', label: '✗ НЕВЕРНО' },
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
  const borderColor = config?.colorVar ?? 'var(--muted)';

  const lines = feedback.split('\n');
  const bodyLines = lines.slice(1).join('\n').trimStart();

  return (
    <div
      className={`feedback-panel ${className}`}
      style={{
        border: `var(--border-width) solid ${borderColor}`,
        borderLeftWidth: '3px',
        borderRadius: 'var(--radius)',
        background: 'var(--panel)',
        padding: '20px',
        transition: 'background 0.35s',
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className="verdict text-[10px] tracking-[0.25em] uppercase font-bold px-2 py-1"
          style={{
            color: borderColor,
            border: `var(--border-width) solid ${borderColor}`,
            borderRadius: 'var(--tag-radius)',
            background: `color-mix(in srgb, ${borderColor} 12%, transparent)`,
          }}
        >
          {config ? config.label : 'ANALYSING'}
        </span>
        {isStreaming && (
          <span
            className="text-[10px] tracking-[0.2em] uppercase loading-dots"
            style={{ color: 'var(--muted)' }}
          >
            ANALYSING
          </span>
        )}
      </div>

      <div
        className="feedback-text leading-relaxed whitespace-pre-wrap text-sm"
        style={{ color: 'var(--text)', fontFamily: 'var(--font-body)' }}
      >
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
