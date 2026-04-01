'use client';

import { useRef, useEffect } from 'react';
import { Mode } from '../types/drill';

interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  mode?: Mode;
}

export default function AnswerInput({
  value,
  onChange,
  onSubmit,
  disabled,
  mode = 'drill',
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
      placeholder={disabled ? '' : mode === 'theory' ? 'Напиши свой ответ здесь...' : 'Введи ответ здесь...'}
      className={[
        'w-full p-4 bg-[var(--panel)] border text-[var(--text)] text-sm',
        mode === 'theory' ? 'leading-relaxed' : 'font-mono leading-relaxed',
        'resize-y outline-none',
        'placeholder:text-[var(--muted)] transition-colors duration-150',
        disabled
          ? 'border-[var(--border)] opacity-50 cursor-not-allowed'
          : 'border-[var(--border)] focus:border-[var(--amber)]',
      ].join(' ')}
    />
  );
}
