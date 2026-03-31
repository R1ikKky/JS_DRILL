'use client';

import { DrillScore } from '../types/drill';

interface ScoreBarProps {
  score: DrillScore;
}

export default function ScoreBar({ score }: ScoreBarProps) {
  const total = score.correct + score.wrong + score.skipped;

  return (
    <div className="flex items-center gap-4 text-xs tracking-[0.15em] uppercase">
      <div className="flex items-center gap-1.5">
        <span
          className="inline-block w-2 h-2"
          style={{ backgroundColor: 'var(--green)' }}
        />
        <span style={{ color: 'var(--green)' }}>{score.correct}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className="inline-block w-2 h-2"
          style={{ backgroundColor: 'var(--red)' }}
        />
        <span style={{ color: 'var(--red)' }}>{score.wrong}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className="inline-block w-2 h-2"
          style={{ backgroundColor: 'var(--muted)' }}
        />
        <span style={{ color: 'var(--muted)' }}>{score.skipped}</span>
      </div>
      {total > 0 && (
        <div className="text-[var(--muted)] pl-2 border-l border-[var(--border)]">
          {Math.round((score.correct / total) * 100)}%
        </div>
      )}
    </div>
  );
}
