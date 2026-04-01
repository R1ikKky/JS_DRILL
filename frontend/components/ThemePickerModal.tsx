'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { THEME_ORDER, THEMES, ThemeId } from '@/lib/themes';

const FONT_OPTIONS = [
  { value: 'var(--font-mono)', label: 'Share Tech Mono' },
  { value: 'var(--font-sans)', label: 'Exo 2' },
  { value: 'var(--font-sour)', label: 'Nunito' },
  { value: 'var(--font-caveat)', label: 'Caveat' },
  { value: 'var(--font-raleway)', label: 'Raleway' },
  { value: 'var(--font-lora)', label: 'Lora' },
  { value: 'var(--font-quicksand)', label: 'Quicksand' },
];

// ── Mini theme previews ─────────────────────────────────────────────────────

function ConsolePreview() {
  return (
    <div style={{ background: '#080c10', padding: '12px', height: '100px', position: 'relative', border: '1px solid #1a2a35', overflow: 'hidden' }}>
      <div style={{ backgroundImage: 'repeating-linear-gradient(rgba(0,212,255,0.03) 0 1px,transparent 1px 40px),repeating-linear-gradient(90deg,rgba(0,212,255,0.03) 0 1px,transparent 1px 40px)', position: 'absolute', inset: 0 }} />
      <div style={{ color: '#00d4ff', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px', marginBottom: '8px', position: 'relative' }}>JS DRILL</div>
      <div style={{ width: '70%', height: '2px', background: '#1a2a35', marginBottom: '6px' }} />
      <div style={{ width: '50%', height: '2px', background: '#1a2a35', marginBottom: '10px' }} />
      <div style={{ border: '1px solid #00d4ff', color: '#00d4ff', padding: '2px 7px', fontSize: '8px', display: 'inline-block', letterSpacing: '1px', fontFamily: 'var(--font-mono)' }}>FIRE</div>
    </div>
  );
}

function AestheticPreview() {
  return (
    <div style={{ background: '#fdf6f9', padding: '12px', height: '100px', position: 'relative', border: '1.5px solid #f0c8d8', borderRadius: '12px 12px 0 0', overflow: 'hidden' }}>
      <div style={{ color: '#e8729a', fontFamily: 'var(--font-pacifico)', fontSize: '11px', marginBottom: '8px' }}>JS Drill</div>
      <div style={{ width: '70%', height: '2px', background: '#f0c8d8', marginBottom: '6px', borderRadius: '4px' }} />
      <div style={{ width: '50%', height: '2px', background: '#f0c8d8', marginBottom: '10px', borderRadius: '4px' }} />
      <div style={{ border: '1.5px solid #e8729a', color: '#e8729a', padding: '2px 10px', fontSize: '8px', display: 'inline-block', borderRadius: '50px', fontFamily: 'var(--font-sour)' }}>fire ♡</div>
    </div>
  );
}

function RichPreview() {
  return (
    <div style={{ background: '#f7f3ec', padding: '12px', height: '100px', position: 'relative', border: '1px solid #ddd0b8', borderRadius: '4px 4px 0 0', overflow: 'hidden' }}>
      <div style={{ color: '#b8922a', fontFamily: 'var(--font-lora)', fontSize: '11px', fontStyle: 'italic', marginBottom: '8px' }}>JS Drill</div>
      <div style={{ width: '70%', height: '2px', background: '#e0d4bc', marginBottom: '6px' }} />
      <div style={{ width: '50%', height: '2px', background: '#e0d4bc', marginBottom: '10px' }} />
      <div style={{ border: '1px solid #b8922a', color: '#b8922a', padding: '2px 8px', fontSize: '8px', display: 'inline-block', borderRadius: '4px', fontFamily: 'var(--font-raleway)', fontWeight: 600, letterSpacing: '1px' }}>FIRE</div>
    </div>
  );
}

function SketchPreview() {
  return (
    <div style={{ background: '#ece5d0', padding: '12px', height: '100px', position: 'relative', border: '1.5px dashed #b8a870', overflow: 'hidden' }}>
      <div style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 17px,rgba(150,120,60,0.08) 17px,rgba(150,120,60,0.08) 18px)', position: 'absolute', inset: 0 }} />
      <div style={{ color: '#5c4020', fontFamily: 'var(--font-caveat)', fontSize: '14px', fontWeight: 700, marginBottom: '8px', position: 'relative' }}>JS Drill</div>
      <div style={{ width: '70%', height: '2px', background: '#b8a870', marginBottom: '6px', position: 'relative' }} />
      <div style={{ width: '50%', height: '2px', background: '#b8a870', marginBottom: '10px', position: 'relative' }} />
      <div style={{ border: '1.5px dashed #5c4020', color: '#5c4020', padding: '2px 8px', fontSize: '9px', display: 'inline-block', boxShadow: '2px 2px 0 #b8a870', fontFamily: 'var(--font-caveat)', fontWeight: 600, position: 'relative' }}>▶ fire!</div>
    </div>
  );
}

function AuroraPreview() {
  return (
    <div style={{ background: '#f0edfb', padding: '12px', height: '100px', position: 'relative', border: '1.5px solid #c8bff0', borderRadius: '14px 14px 0 0', overflow: 'hidden' }}>
      <div style={{ width: '55%', height: '4px', background: 'linear-gradient(90deg,#7c5ce8,#4eb8d8)', borderRadius: '8px', marginBottom: '8px' }} />
      <div style={{ width: '70%', height: '2px', background: '#d8d0f0', marginBottom: '6px' }} />
      <div style={{ width: '50%', height: '2px', background: '#d8d0f0', marginBottom: '10px' }} />
      <div style={{ border: '1.5px solid #7c5ce8', color: '#7c5ce8', padding: '2px 10px', fontSize: '8px', display: 'inline-block', borderRadius: '10px', fontFamily: 'var(--font-quicksand)', fontWeight: 600 }}>fire</div>
    </div>
  );
}

const PREVIEWS: Record<ThemeId, React.ComponentType> = {
  console: ConsolePreview,
  aesthetic: AestheticPreview,
  rich: RichPreview,
  sketch: SketchPreview,
  aurora: AuroraPreview,
};

const LABEL_STYLES: Record<ThemeId, React.CSSProperties> = {
  console: { background: '#0d1318', color: '#4a6070', fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '2px', padding: '8px 12px' },
  aesthetic: { background: '#ffffff', color: '#e8729a', fontFamily: 'var(--font-sour)', fontSize: '12px', padding: '8px 12px' },
  rich: { background: '#ffffff', color: '#b8922a', fontFamily: 'var(--font-raleway)', fontWeight: 700, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', padding: '8px 12px' },
  sketch: { background: '#f4eedc', color: '#5c4020', fontFamily: 'var(--font-caveat)', fontSize: '14px', fontWeight: 600, borderTop: '1.5px dashed #b8a870', padding: '8px 12px' },
  aurora: { background: '#fdfcff', color: '#7c5ce8', fontFamily: 'var(--font-quicksand)', fontWeight: 700, fontSize: '12px', padding: '8px 12px' },
};

// ── Modal ───────────────────────────────────────────────────────────────────

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ThemePickerModal({ open, onClose }: Props) {
  const { themeId, theme, setTheme, codeOverride, setCodeOverride } = useTheme();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const handleSelect = (id: ThemeId) => {
    setTheme(id);
    timerRef.current = setTimeout(onClose, 260);
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--panel)',
          border: `1px solid var(--border)`,
          padding: '28px',
          width: '100%',
          maxWidth: '640px',
          animation: 'modal-in 280ms ease forwards',
          fontFamily: 'var(--font-body)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <span style={{ color: 'var(--text)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Theme
          </span>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: '18px', cursor: 'pointer', lineHeight: 1, padding: '2px 6px' }}
          >
            ✕
          </button>
        </div>

        {/* Theme grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px', marginBottom: '24px' }}>
          {THEME_ORDER.map((id) => {
            const Preview = PREVIEWS[id];
            const isSelected = themeId === id;
            return (
              <div
                key={id}
                onClick={() => handleSelect(id)}
                style={{
                  cursor: 'pointer',
                  border: isSelected ? `2px solid var(--cyan)` : '2px solid transparent',
                  overflow: 'hidden',
                  transition: 'transform 0.15s',
                  position: 'relative',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
              >
                {isSelected && (
                  <div style={{
                    position: 'absolute', top: '6px', right: '6px', zIndex: 10,
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: 'var(--cyan)', color: 'var(--bg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', fontWeight: 700,
                  }}>✓</div>
                )}
                <Preview />
                <div style={LABEL_STYLES[id]}>{THEMES[id].label}</div>
              </div>
            );
          })}
        </div>

        {/* Code style section */}
        <div style={{ paddingTop: '20px', borderTop: `1px solid var(--border)` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: codeOverride ? '16px' : '0' }}>
            <span style={{ color: 'var(--text)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Code style
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--muted)', fontSize: '10px', letterSpacing: '0.1em' }}>
                {codeOverride ? 'custom' : 'from theme'}
              </span>
              <div
                onClick={() => {
                  if (codeOverride) {
                    setCodeOverride(null);
                  } else {
                    setCodeOverride({ bg: theme.codeBg, color: theme.codeColor, fontFamily: theme.codeFontFamily });
                  }
                }}
                style={{
                  width: '38px', height: '20px', borderRadius: '10px',
                  background: codeOverride ? 'var(--muted)' : 'var(--cyan)',
                  position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
                  flexShrink: 0,
                }}
              >
                <div style={{
                  position: 'absolute', top: '3px',
                  left: codeOverride ? '3px' : '19px',
                  width: '14px', height: '14px', borderRadius: '50%',
                  background: 'white', transition: 'left 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }} />
              </div>
            </div>
          </div>

          {codeOverride && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.1em' }}>BG</span>
                <input
                  type="color" value={codeOverride.bg}
                  onChange={(e) => setCodeOverride({ ...codeOverride, bg: e.target.value })}
                  style={{ width: '44px', height: '30px', cursor: 'pointer', border: `1px solid var(--border)`, background: 'none', padding: '2px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.1em' }}>COLOR</span>
                <input
                  type="color" value={codeOverride.color}
                  onChange={(e) => setCodeOverride({ ...codeOverride, color: e.target.value })}
                  style={{ width: '44px', height: '30px', cursor: 'pointer', border: `1px solid var(--border)`, background: 'none', padding: '2px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: '130px' }}>
                <span style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.1em' }}>FONT</span>
                <select
                  value={codeOverride.fontFamily}
                  onChange={(e) => setCodeOverride({ ...codeOverride, fontFamily: e.target.value })}
                  style={{
                    fontFamily: codeOverride.fontFamily,
                    background: 'var(--bg)', color: 'var(--text)',
                    border: `1px solid var(--border)`,
                    padding: '6px 8px', fontSize: '12px', cursor: 'pointer', outline: 'none',
                  }}
                >
                  {FONT_OPTIONS.map((f) => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>
              {/* Live preview */}
              <div style={{
                flex: 1, minWidth: '120px',
                padding: '8px 12px',
                background: codeOverride.bg,
                border: `1px solid var(--border)`,
                fontFamily: codeOverride.fontFamily,
                color: codeOverride.color,
                fontSize: '12px', lineHeight: 1.6, whiteSpace: 'pre',
              }}>
                {'const x = 42;\nreturn x;'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
