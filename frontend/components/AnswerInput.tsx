'use client';

import { useRef, useEffect } from 'react';

interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

export default function AnswerInput({
  value,
  onChange,
  onSubmit,
  disabled,
}: AnswerInputProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!disabled && ref.current) {
      ref.current.focus();
    }
  }, [disabled]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
          e.preventDefault();
          if (!disabled && value.trim()) onSubmit();
        }
      }}
      disabled={disabled}
      rows={8}
      placeholder={disabled ? '' : 'Введи ответ здесь...'}
      style={{
        width: '100%',
        padding: '16px',
        background: 'var(--panel)',
        border: `var(--border-width) solid var(--border)`,
        borderRadius: 'var(--input-radius)',
        color: 'var(--text)',
        fontSize: '14px',
        fontFamily: 'var(--font-mono-theme)',
        lineHeight: '1.6',
        resize: 'vertical',
        outline: 'none',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'text',
        transition: 'border-color 0.15s, background 0.35s',
        boxSizing: 'border-box',
      }}
      onFocus={(e) => {
        if (!disabled) {
          (e.target as HTMLTextAreaElement).style.borderColor = 'var(--accent2)';
        }
      }}
      onBlur={(e) => {
        (e.target as HTMLTextAreaElement).style.borderColor = 'var(--border)';
      }}
    />
  );
}
