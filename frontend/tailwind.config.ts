import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'th-bg':       'var(--bg)',
        'th-bg2':      'var(--bg2)',
        'th-panel':    'var(--panel)',
        'th-border':   'var(--border)',
        'th-accent':   'var(--accent)',
        'th-accent2':  'var(--accent2)',
        'th-positive': 'var(--positive)',
        'th-negative': 'var(--negative)',
        'th-muted':    'var(--muted)',
        'th-text':     'var(--text)',
        'th-strong':   'var(--text-strong)',
      },
      borderRadius: {
        'th':     'var(--radius)',
        'th-sm':  'var(--radius-sm)',
        'th-btn': 'var(--btn-radius)',
      },
      fontFamily: {
        'th-head': 'var(--font-head)',
        'th-body': 'var(--font-body)',
        'th-mono': 'var(--font-mono-theme)',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
