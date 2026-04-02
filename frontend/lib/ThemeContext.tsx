'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeId, ThemeConfig, THEMES, DEFAULT_THEME } from './themes';
import { useAuth } from './AuthContext';

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
  const { user } = useAuth();
  const [themeId, setThemeId] = useState<ThemeId>(DEFAULT_THEME);
  const [codeOverride, setCodeOverrideState] = useState<CodeOverride | null>(null);

  // Apply server-side theme when user session is restored
  useEffect(() => {
    if (!user?.preferredTheme) return;
    const serverTheme = user.preferredTheme as ThemeId;
    if (THEMES[serverTheme]) setThemeId(serverTheme);
  }, [user?.preferredTheme]);

  useEffect(() => {
    const saved = localStorage.getItem('drill-theme') as ThemeId | null;
    if (saved && THEMES[saved]) setThemeId(saved);

    const savedCode = localStorage.getItem('drill-code-override');
    if (savedCode) {
      try { setCodeOverrideState(JSON.parse(savedCode)); } catch { /* ignore */ }
    }
  }, []);

  // Apply theme color vars
  useEffect(() => {
    const t = THEMES[themeId];
    const root = document.documentElement;

    root.setAttribute('data-theme', themeId);
    root.style.setProperty('--bg', t.bg);
    root.style.setProperty('--panel', t.panel);
    root.style.setProperty('--border', t.border);
    root.style.setProperty('--cyan', t.cyan);
    root.style.setProperty('--amber', t.amber);
    root.style.setProperty('--green', t.green);
    root.style.setProperty('--red', t.red);
    root.style.setProperty('--muted', t.muted);
    root.style.setProperty('--text', t.text);
    root.style.setProperty('--font-body', t.fontBody);

    localStorage.setItem('drill-theme', themeId);
  }, [themeId]);

  // Apply code vars (theme default or override)
  useEffect(() => {
    const t = THEMES[themeId];
    const root = document.documentElement;
    const active = codeOverride ?? {
      bg: t.codeBg,
      color: t.codeColor,
      fontFamily: t.codeFontFamily,
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

  return (
    <ThemeContext.Provider
      value={{
        themeId,
        theme: THEMES[themeId],
        setTheme: setThemeId,
        codeOverride,
        setCodeOverride: setCodeOverrideState,
      }}
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
