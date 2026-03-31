'use client';

import { Difficulty, DIFFICULTY_LABELS } from '../types/drill';

interface DifficultySelectorProps {
  selected: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
  disabled: boolean;
}

const DIFFICULTIES = Object.keys(DIFFICULTY_LABELS) as Difficulty[];

const DIFFICULTY_VARS: Record<Difficulty, string> = {
  easy:   'var(--positive)',
  medium: 'var(--accent2)',
  hard:   'var(--negative)',
  mixed:  'var(--accent)',
};

export default function DifficultySelector({
  selected,
  onSelect,
  disabled,
}: DifficultySelectorProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {DIFFICULTIES.map((diff) => {
        const isActive = selected === diff;
        const color = DIFFICULTY_VARS[diff];
        return (
          <button
            key={diff}
            onClick={() => onSelect(diff)}
            disabled={disabled}
            className="diff-btn"
            style={{
              padding: '8px 20px',
              fontSize: '12px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              border: `var(--border-width) solid ${isActive ? color : 'var(--border)'}`,
              borderRadius: 'var(--btn-radius)',
              background: isActive
                ? `color-mix(in srgb, ${color} 10%, transparent)`
                : 'transparent',
              color: isActive ? color : 'var(--muted)',
              fontFamily: 'var(--font-body)',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.4 : 1,
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              if (disabled || isActive) return;
              const el = e.currentTarget as HTMLButtonElement;
              el.style.borderColor = color;
              el.style.color = color;
            }}
            onMouseLeave={(e) => {
              if (isActive) return;
              const el = e.currentTarget as HTMLButtonElement;
              el.style.borderColor = 'var(--border)';
              el.style.color = 'var(--muted)';
            }}
          >
            {DIFFICULTY_LABELS[diff]}
          </button>
        );
      })}
    </div>
  );
}
