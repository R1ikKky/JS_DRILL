'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ThemeId, ThemeConfig, THEMES, DEFAULT_THEME } from './themes';

export interface CodeOverride {
  bg: string;
  color: string;
  fontFamily: string;
}

interface ThemeContextValue {
  themeId: ThemeId;
  theme: ThemeConfig;
  setTheme: (id: ThemeId) => void;
  codeOverride: CodeOverride | null;
  setCodeOverride: (override: CodeOverride | null) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(DEFAULT_THEME);
  const [codeOverride, setCodeOverrideState] = useState<CodeOverride | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('drill-theme') as ThemeId | null;
    if (saved && THEMES[saved]) setThemeId(saved);

    const savedCode = localStorage.getItem('drill-code-override');
    if (savedCode) {
      try {
        setCodeOverrideState(JSON.parse(savedCode));
      } catch {
        // ignore malformed data
      }
    }
  }, []);

  useEffect(() => {
    const theme = THEMES[themeId];
    const root = document.documentElement;

    root.setAttribute('data-theme', themeId);
    root.style.setProperty('--bg', theme.bg);
    root.style.setProperty('--bg2', theme.bg2);
    root.style.setProperty('--panel', theme.panel);
    root.style.setProperty('--border', theme.border);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--accent2', theme.accent2);
    root.style.setProperty('--positive', theme.positive);
    root.style.setProperty('--negative', theme.negative);
    root.style.setProperty('--muted', theme.muted);
    root.style.setProperty('--text', theme.text);
    root.style.setProperty('--text-strong', theme.textStrong);
    root.style.setProperty('--radius', theme.radius);
    root.style.setProperty('--radius-sm', theme.radiusSm);
    root.style.setProperty('--btn-radius', theme.btnRadius);
    root.style.setProperty('--tag-radius', theme.tagRadius);
    root.style.setProperty('--input-radius', theme.inputRadius);
    root.style.setProperty('--modal-radius', theme.modalRadius);
    root.style.setProperty('--border-width', theme.borderWidth);
    root.style.setProperty('--font-head', theme.fontHead);
    root.style.setProperty('--font-mono-theme', theme.fontMono);
    root.style.setProperty('--font-body', theme.fontBody);
    root.style.setProperty('--shadow-sm', theme.shadowSm);
    root.style.setProperty('--shadow-md', theme.shadowMd);
    root.style.setProperty('--grid-bg', theme.gridBg);
    localStorage.setItem('drill-theme', themeId);
  }, [themeId]);

  useEffect(() => {
    const theme = THEMES[themeId];
    const root = document.documentElement;
    const active = codeOverride ?? {
      bg: theme.codeBg,
      color: theme.codeColor,
      fontFamily: theme.codeFontFamily,
    };
    root.style.setProperty('--code-bg', active.bg);
    root.style.setProperty('--code-color', active.color);
    root.style.setProperty('--code-font', active.fontFamily);

    if (codeOverride) {
      localStorage.setItem('drill-code-override', JSON.stringify(codeOverride));
    } else {
      localStorage.removeItem('drill-code-override');
    }
  }, [themeId, codeOverride]);

  const setCodeOverride = (override: CodeOverride | null) => {
    setCodeOverrideState(override);
  };

  return (
    <ThemeContext.Provider
      value={{ themeId, theme: THEMES[themeId], setTheme: setThemeId, codeOverride, setCodeOverride }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
