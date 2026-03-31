'use client';

import { Difficulty, DIFFICULTY_LABELS } from '../types/drill';

interface DifficultySelectorProps {
  selected: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
  disabled: boolean;
}

const DIFFICULTIES = Object.keys(DIFFICULTY_LABELS) as Difficulty[];

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: 'var(--green)',
  medium: 'var(--amber)',
  hard: 'var(--red)',
  mixed: 'var(--cyan)',
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
        const color = DIFFICULTY_COLORS[diff];
        return (
          <button
            key={diff}
            onClick={() => onSelect(diff)}
            disabled={disabled}
            style={
              isActive
                ? {
                    borderColor: color,
                    color: color,
                    backgroundColor: `color-mix(in srgb, ${color} 8%, transparent)`,
                  }
                : {}
            }
            className={[
              'px-5 py-2 text-xs tracking-[0.25em] uppercase',
              'border transition-all duration-150',
              'disabled:cursor-not-allowed disabled:opacity-40',
              isActive
                ? ''
                : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--amber)] hover:text-[var(--amber)]',
            ].join(' ')}
          >
            {DIFFICULTY_LABELS[diff]}
          </button>
        );
      })}
    </div>
  );
}
