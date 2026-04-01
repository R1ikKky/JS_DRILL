'use client';

import { Mode } from '../types/drill';

interface ModeToggleProps {
  selected: Mode;
  onSelect: (mode: Mode) => void;
  disabled: boolean;
}

export default function ModeToggle({
  selected,
  onSelect,
  disabled,
}: ModeToggleProps) {
  const modes: { value: Mode; label: string }[] = [
    { value: 'drill', label: 'DRILL' },
    { value: 'theory', label: 'THEORY' },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {modes.map(({ value, label }) => {
        const isActive = selected === value;
        const color = value === 'drill' ? 'var(--cyan)' : 'var(--amber)';
        return (
          <button
            key={value}
            onClick={() => onSelect(value)}
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
            {label}
          </button>
        );
      })}
    </div>
  );
}
