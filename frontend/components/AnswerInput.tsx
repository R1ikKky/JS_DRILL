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
      className={[
        'w-full p-4 bg-[var(--panel)] border text-[var(--text)] text-sm',
        'font-mono leading-relaxed resize-y outline-none',
        'placeholder:text-[var(--muted)] transition-colors duration-150',
        disabled
          ? 'border-[var(--border)] opacity-50 cursor-not-allowed'
          : 'border-[var(--border)] focus:border-[var(--amber)]',
      ].join(' ')}
    />
  );
}
