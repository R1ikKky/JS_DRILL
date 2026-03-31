'use client';

import { DrillScore } from '../types/drill';

interface ScoreBarProps {
  score: DrillScore;
}

export default function ScoreBar({ score }: ScoreBarProps) {
  const total = score.correct + score.wrong + score.skipped;

  return (
    <div
      className="flex items-center gap-4 text-xs tracking-[0.15em] uppercase"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <div className="flex items-center gap-1.5">
        <span
          className="inline-block w-2 h-2"
          style={{ background: 'var(--positive)', borderRadius: 'var(--tag-radius)' }}
        />
        <span className="score-num" style={{ color: 'var(--positive)' }}>
          {score.correct}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className="inline-block w-2 h-2"
          style={{ background: 'var(--negative)', borderRadius: 'var(--tag-radius)' }}
        />
        <span className="score-num" style={{ color: 'var(--negative)' }}>
          {score.wrong}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className="inline-block w-2 h-2"
          style={{ background: 'var(--muted)', borderRadius: 'var(--tag-radius)' }}
        />
        <span className="score-num" style={{ color: 'var(--muted)' }}>
          {score.skipped}
        </span>
      </div>
      {total > 0 && (
        <div
          className="pl-2"
          style={{
            color: 'var(--muted)',
            borderLeft: `var(--border-width) solid var(--border)`,
          }}
        >
          {Math.round((score.correct / total) * 100)}%
        </div>
      )}
    </div>
  );
}
