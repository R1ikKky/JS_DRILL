'use client';

import { useTheme } from '@/lib/ThemeContext';

interface ThemePickerButtonProps {
  onClick: () => void;
}

export function ThemePickerButton({ onClick }: ThemePickerButtonProps) {
  const { theme } = useTheme();
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'transparent',
        border: `var(--border-width) solid var(--border)`,
        color: 'var(--text)',
        fontFamily: 'var(--font-body)',
        padding: '7px 14px',
        borderRadius: 'var(--btn-radius)',
        cursor: 'pointer',
        fontSize: '13px',
        transition: 'all 0.25s',
        boxShadow: 'var(--shadow-sm)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)';
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: 'var(--accent)',
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
      {theme.label}
    </button>
  );
}
