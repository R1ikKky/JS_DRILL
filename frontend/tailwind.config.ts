import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#080c10',
        panel: '#0d1318',
        'drill-border': '#1a2a35',
        cyan: '#00d4ff',
        amber: '#ffaa00',
        green: '#00ff88',
        red: '#ff4466',
        muted: '#4a6070',
        'drill-text': '#c8dce8',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'monospace'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'dots': 'dots 1.5s steps(3, end) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
