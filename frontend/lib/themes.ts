export type ThemeId = 'console' | 'aesthetic' | 'rich' | 'sketch' | 'aurora';

export interface ThemeConfig {
  id: ThemeId;
  label: string;
  bg: string;
  bg2: string;
  panel: string;
  border: string;
  accent: string;
  accent2: string;
  positive: string;
  negative: string;
  muted: string;
  text: string;
  textStrong: string;
  radius: string;
  radiusSm: string;
  btnRadius: string;
  tagRadius: string;
  inputRadius: string;
  modalRadius: string;
  borderWidth: string;
  fontHead: string;
  fontMono: string;
  fontBody: string;
  shadowSm: string;
  shadowMd: string;
  gridBg: string;
  // Default code block style for this theme
  codeBg: string;
  codeColor: string;
  codeFontFamily: string;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  console: {
    id: 'console',
    label: 'Console-like',
    bg: '#080c10',
    bg2: '#0d1318',
    panel: '#0d1318',
    border: '#1a2a35',
    accent: '#00d4ff',
    accent2: '#ffaa00',
    positive: '#00ff88',
    negative: '#ff4466',
    muted: '#4a6070',
    text: '#c8dce8',
    textStrong: '#ffffff',
    radius: '0px',
    radiusSm: '0px',
    btnRadius: '0px',
    tagRadius: '0px',
    inputRadius: '0px',
    modalRadius: '0px',
    borderWidth: '1px',
    fontHead: 'var(--font-exo)',
    fontMono: 'var(--font-mono)',
    fontBody: 'var(--font-exo)',
    shadowSm: 'none',
    shadowMd: 'none',
    gridBg: 'repeating-linear-gradient(rgba(0,212,255,0.025) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(0,212,255,0.025) 0 1px, transparent 1px 40px)',
    codeBg: '#0d1318',
    codeColor: '#00d4ff',
    codeFontFamily: 'var(--font-mono)',
  },
  aesthetic: {
    id: 'aesthetic',
    label: 'Aesthetic ♡',
    bg: '#fdf6f9',
    bg2: '#fff0f5',
    panel: '#ffffff',
    border: '#f0c8d8',
    accent: '#e8729a',
    accent2: '#c94e7a',
    positive: '#7ec8a0',
    negative: '#e07090',
    muted: '#c8a0b0',
    text: '#7a4a5a',
    textStrong: '#3a1a2a',
    radius: '20px',
    radiusSm: '12px',
    btnRadius: '50px',
    tagRadius: '50px',
    inputRadius: '16px',
    modalRadius: '28px',
    borderWidth: '1.5px',
    fontHead: 'var(--font-pacifico)',
    fontMono: 'var(--font-sour)',
    fontBody: 'var(--font-sour)',
    shadowSm: '0 4px 24px rgba(232,114,154,0.12)',
    shadowMd: '0 8px 32px rgba(232,114,154,0.1)',
    gridBg: 'none',
    codeBg: '#fff0f5',
    codeColor: '#e8729a',
    codeFontFamily: 'var(--font-sour)',
  },
  rich: {
    id: 'rich',
    label: 'Middle Rich',
    bg: '#f7f3ec',
    bg2: '#f0ead9',
    panel: '#ffffff',
    border: '#ddd0b8',
    accent: '#b8922a',
    accent2: '#2a5c52',
    positive: '#3a7a5a',
    negative: '#c05040',
    muted: '#a8957a',
    text: '#4a3c28',
    textStrong: '#1e1810',
    radius: '8px',
    radiusSm: '6px',
    btnRadius: '6px',
    tagRadius: '4px',
    inputRadius: '6px',
    modalRadius: '12px',
    borderWidth: '1px',
    fontHead: 'var(--font-lora)',
    fontMono: 'var(--font-raleway)',
    fontBody: 'var(--font-raleway)',
    shadowSm: '0 2px 12px rgba(184,146,42,0.1)',
    shadowMd: '0 4px 24px rgba(184,146,42,0.08)',
    gridBg: 'none',
    codeBg: '#f0ead9',
    codeColor: '#b8922a',
    codeFontFamily: 'var(--font-raleway)',
  },
  sketch: {
    id: 'sketch',
    label: 'Sketch',
    bg: '#ece5d0',
    bg2: '#e3dbc4',
    panel: '#f4eedc',
    border: '#b8a870',
    accent: '#5c4020',
    accent2: '#8a6030',
    positive: '#486030',
    negative: '#983020',
    muted: '#988060',
    text: '#2e2416',
    textStrong: '#140e06',
    radius: '4px',
    radiusSm: '3px',
    btnRadius: '4px',
    tagRadius: '3px',
    inputRadius: '4px',
    modalRadius: '10px',
    borderWidth: '1.5px',
    fontHead: 'var(--font-caveat)',
    fontMono: 'var(--font-caveat)',
    fontBody: 'var(--font-caveat)',
    shadowSm: '3px 3px 0 #b8a870',
    shadowMd: '5px 5px 0 #b8a870',
    gridBg: 'none',
    codeBg: '#e3dbc4',
    codeColor: '#3a2a14',
    codeFontFamily: 'var(--font-caveat)',
  },
  aurora: {
    id: 'aurora',
    label: 'Aurora',
    bg: '#f0edfb',
    bg2: '#e8e4f8',
    panel: '#fdfcff',
    border: '#c8bff0',
    accent: '#7c5ce8',
    accent2: '#4eb8d8',
    positive: '#54b89a',
    negative: '#d06090',
    muted: '#9e94cc',
    text: '#4a4278',
    textStrong: '#221e54',
    radius: '18px',
    radiusSm: '12px',
    btnRadius: '14px',
    tagRadius: '10px',
    inputRadius: '14px',
    modalRadius: '26px',
    borderWidth: '1.5px',
    fontHead: 'var(--font-quicksand)',
    fontMono: 'var(--font-quicksand)',
    fontBody: 'var(--font-quicksand)',
    shadowSm: '0 4px 20px rgba(124,92,232,0.1)',
    shadowMd: '0 8px 32px rgba(124,92,232,0.09)',
    gridBg: 'none',
    codeBg: '#e8e4f8',
    codeColor: '#7c5ce8',
    codeFontFamily: 'var(--font-quicksand)',
  },
};

export const THEME_ORDER: ThemeId[] = [
  'console',
  'aesthetic',
  'rich',
  'sketch',
  'aurora',
];
export const DEFAULT_THEME: ThemeId = 'console';
