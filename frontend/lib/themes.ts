export type ThemeId = 'console' | 'aesthetic' | 'rich' | 'sketch' | 'aurora';

export interface ThemeConfig {
  id: ThemeId;
  label: string;
  // Base colors
  bg: string;
  panel: string;
  border: string;
  // Semantic palette (mapped to --cyan/amber/green/red CSS vars)
  cyan: string;
  amber: string;
  green: string;
  red: string;
  muted: string;
  text: string;
  // Typography
  fontBody: string;
  // Code block defaults
  codeBg: string;
  codeColor: string;
  codeFontFamily: string;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  console: {
    id: 'console',
    label: 'Console',
    bg: '#080c10',
    panel: '#0d1318',
    border: '#1a2a35',
    cyan: '#00d4ff',
    amber: '#ffaa00',
    green: '#00ff88',
    red: '#ff4466',
    muted: '#4a6070',
    text: '#c8dce8',
    fontBody: 'var(--font-mono)',
    codeBg: '#060a0e',
    codeColor: '#00d4ff',
    codeFontFamily: 'var(--font-mono)',
  },
  aesthetic: {
    id: 'aesthetic',
    label: 'Aesthetic ♡',
    bg: '#fdf6f9',
    panel: '#ffffff',
    border: '#f0c8d8',
    cyan: '#e8729a',
    amber: '#c94e7a',
    green: '#5aaa7a',
    red: '#e05070',
    muted: '#c8a0b0',
    text: '#7a4a5a',
    fontBody: 'var(--font-sour)',
    codeBg: '#fff0f5',
    codeColor: '#e8729a',
    codeFontFamily: 'var(--font-sour)',
  },
  rich: {
    id: 'rich',
    label: 'Middle Rich',
    bg: '#f7f3ec',
    panel: '#ffffff',
    border: '#ddd0b8',
    cyan: '#b8922a',
    amber: '#2a5c52',
    green: '#3a7a5a',
    red: '#c05040',
    muted: '#a8957a',
    text: '#4a3c28',
    fontBody: 'var(--font-raleway)',
    codeBg: '#f0ead9',
    codeColor: '#b8922a',
    codeFontFamily: 'var(--font-raleway)',
  },
  sketch: {
    id: 'sketch',
    label: 'Sketch',
    bg: '#ece5d0',
    panel: '#f4eedc',
    border: '#b8a870',
    cyan: '#5c4020',
    amber: '#8a6030',
    green: '#486030',
    red: '#983020',
    muted: '#988060',
    text: '#2e2416',
    fontBody: 'var(--font-caveat)',
    codeBg: '#e3dbc4',
    codeColor: '#3a2a14',
    codeFontFamily: 'var(--font-caveat)',
  },
  aurora: {
    id: 'aurora',
    label: 'Aurora',
    bg: '#f0edfb',
    panel: '#fdfcff',
    border: '#c8bff0',
    cyan: '#7c5ce8',
    amber: '#4eb8d8',
    green: '#54b89a',
    red: '#d06090',
    muted: '#9e94cc',
    text: '#4a4278',
    fontBody: 'var(--font-quicksand)',
    codeBg: '#e8e4f8',
    codeColor: '#7c5ce8',
    codeFontFamily: 'var(--font-quicksand)',
  },
};

export const THEME_ORDER: ThemeId[] = ['console', 'aesthetic', 'rich', 'sketch', 'aurora'];
export const DEFAULT_THEME: ThemeId = 'console';
