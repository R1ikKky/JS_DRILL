'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { THEME_ORDER, THEMES, ThemeId } from '@/lib/themes';

const FONT_OPTIONS = [
  { value: 'var(--font-mono)', label: 'Share Tech Mono' },
  { value: 'var(--font-exo)', label: 'Exo 2' },
  { value: 'var(--font-sour)', label: 'Nunito' },
  { value: 'var(--font-caveat)', label: 'Caveat' },
  { value: 'var(--font-raleway)', label: 'Raleway' },
  { value: 'var(--font-lora)', label: 'Lora' },
  { value: 'var(--font-quicksand)', label: 'Quicksand' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

// ── Mini previews (hardcoded per-theme, not using CSS vars) ─────────────────

function ConsolePreview() {
  return (
    <div
      style={{
        background: '#080c10',
        padding: '12px',
        height: '110px',
        position: 'relative',
        border: '1px solid #1a2a35',
        overflow: 'hidden',
      }}
    >
      <div style={{ width: '60%', height: '3px', background: '#00d4ff', marginBottom: '10px' }} />
      <div style={{ width: '80%', height: '2px', background: '#1a2a35', marginBottom: '7px' }} />
      <div style={{ width: '65%', height: '2px', background: '#1a2a35', marginBottom: '7px' }} />
      <div style={{ width: '72%', height: '2px', background: '#1a2a35', marginBottom: '10px' }} />
      <div
        style={{
          border: '1px solid #00d4ff',
          color: '#00d4ff',
          padding: '2px 7px',
          fontSize: '8px',
          display: 'inline-block',
          letterSpacing: '1px',
          fontFamily: 'var(--font-mono)',
        }}
      >
        FIRE
      </div>
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#00ff88',
          boxShadow: '0 0 8px #00ff88',
        }}
      />
    </div>
  );
}

function AestheticPreview() {
  return (
    <div
      style={{
        background: '#fdf6f9',
        padding: '12px',
        height: '110px',
        position: 'relative',
        border: '1.5px solid #f0c8d8',
        borderRadius: '14px 14px 0 0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '55%',
          height: '5px',
          background: 'linear-gradient(90deg,#e8729a,#f0a0c0)',
          borderRadius: '10px',
          marginBottom: '10px',
        }}
      />
      <div style={{ width: '80%', height: '2px', background: '#f0c8d8', marginBottom: '7px' }} />
      <div style={{ width: '65%', height: '2px', background: '#f0c8d8', marginBottom: '7px' }} />
      <div style={{ width: '72%', height: '2px', background: '#f0c8d8', marginBottom: '10px' }} />
      <div
        style={{
          border: '1.5px solid #e8729a',
          color: '#e8729a',
          padding: '2px 10px',
          fontSize: '9px',
          display: 'inline-block',
          borderRadius: '50px',
          fontFamily: 'var(--font-sour)',
        }}
      >
        ♡
      </div>
    </div>
  );
}

function RichPreview() {
  return (
    <div
      style={{
        background: '#f7f3ec',
        padding: '12px',
        height: '110px',
        position: 'relative',
        border: '1px solid #ddd0b8',
        borderRadius: '6px 6px 0 0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '60%',
          height: '4px',
          background: '#b8922a',
          borderRadius: '2px',
          marginBottom: '10px',
        }}
      />
      <div style={{ width: '80%', height: '2px', background: '#e0d4bc', marginBottom: '7px' }} />
      <div style={{ width: '65%', height: '2px', background: '#e0d4bc', marginBottom: '7px' }} />
      <div style={{ width: '72%', height: '2px', background: '#e0d4bc', marginBottom: '10px' }} />
      <div
        style={{
          border: '1px solid #b8922a',
          color: '#b8922a',
          padding: '2px 8px',
          fontSize: '9px',
          display: 'inline-block',
          borderRadius: '6px',
          fontFamily: 'var(--font-raleway)',
          fontWeight: 600,
        }}
      >
        GO
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '10px',
          fontFamily: 'var(--font-raleway)',
          fontWeight: 800,
          fontSize: '11px',
          color: '#b8922a',
        }}
      >
        MR
      </div>
    </div>
  );
}

function SketchPreview() {
  return (
    <div
      style={{
        background: '#ece5d0',
        padding: '12px',
        height: '110px',
        position: 'relative',
        border: '1.5px dashed #b8a870',
        overflow: 'hidden',
      }}
    >
      {/* paper lines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 17px, rgba(150,120,60,0.08) 17px, rgba(150,120,60,0.08) 18px)',
      }} />
      <div style={{ width: '62%', height: '5px', background: '#5c4020', borderRadius: '2px', marginBottom: '10px', position: 'relative' }} />
      <div style={{ width: '80%', height: '2px', background: '#b8a870', marginBottom: '8px', position: 'relative' }} />
      <div style={{ width: '65%', height: '2px', background: '#b8a870', marginBottom: '8px', position: 'relative' }} />
      <div
        style={{
          border: '1.5px dashed #5c4020',
          color: '#5c4020',
          padding: '2px 8px',
          fontSize: '10px',
          display: 'inline-block',
          boxShadow: '2px 2px 0 #b8a870',
          fontFamily: 'var(--font-caveat)',
          fontWeight: 600,
          position: 'relative',
        }}
      >
        ▶ fire!
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '6px',
          right: '8px',
          fontFamily: 'var(--font-caveat)',
          fontSize: '12px',
          color: '#988060',
          transform: 'rotate(-4deg)',
        }}
      >
        notebook ✏
      </div>
    </div>
  );
}

function AuroraPreview() {
  return (
    <div
      style={{
        background: '#f0edfb',
        padding: '12px',
        height: '110px',
        position: 'relative',
        border: '1.5px solid #c8bff0',
        borderRadius: '14px 14px 0 0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '58%',
          height: '5px',
          background: 'linear-gradient(90deg,#7c5ce8,#4eb8d8)',
          borderRadius: '8px',
          marginBottom: '10px',
        }}
      />
      <div style={{ width: '80%', height: '2px', background: '#d8d0f0', marginBottom: '7px' }} />
      <div style={{ width: '65%', height: '2px', background: '#d8d0f0', marginBottom: '7px' }} />
      <div style={{ width: '72%', height: '2px', background: '#d8d0f0', marginBottom: '10px' }} />
      <div
        style={{
          border: '1.5px solid #7c5ce8',
          color: '#7c5ce8',
          padding: '2px 10px',
          fontSize: '9px',
          display: 'inline-block',
          borderRadius: '12px',
          fontFamily: 'var(--font-quicksand)',
          fontWeight: 600,
        }}
      >
        go
      </div>
    </div>
  );
}

// ── Per-card label styles ────────────────────────────────────────────────────

const LABEL_STYLES: Record<ThemeId, React.CSSProperties> = {
  console: {
    background: '#0d1318',
    color: '#c8dce8',
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    letterSpacing: '2px',
    padding: '9px 12px',
  },
  aesthetic: {
    background: '#ffffff',
    color: '#e8729a',
    fontFamily: 'var(--font-sour)',
    fontWeight: 500,
    fontSize: '13px',
    padding: '9px 12px',
  },
  rich: {
    background: '#ffffff',
    color: '#b8922a',
    fontFamily: 'var(--font-raleway)',
    fontWeight: 700,
    fontSize: '11px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '9px 12px',
  },
  sketch: {
    background: '#f4eedc',
    color: '#5c4020',
    fontFamily: 'var(--font-caveat)',
    fontSize: '15px',
    fontWeight: 600,
    borderTop: '1.5px dashed #b8a870',
    padding: '9px 12px',
  },
  aurora: {
    background: '#fdfcff',
    color: '#7c5ce8',
    fontFamily: 'var(--font-quicksand)',
    fontWeight: 700,
    fontSize: '13px',
    padding: '9px 12px',
  },
};

const PREVIEWS: Record<ThemeId, React.ComponentType> = {
  console: ConsolePreview,
  aesthetic: AestheticPreview,
  rich: RichPreview,
  sketch: SketchPreview,
  aurora: AuroraPreview,
};

// ── Modal ────────────────────────────────────────────────────────────────────

export default function ThemePickerModal({ open, onClose }: Props) {
  const { themeId, theme, setTheme, codeOverride, setCodeOverride } = useTheme();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSelect = (id: ThemeId) => {
    setTheme(id);
    timerRef.current = setTimeout(onClose, 260);
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--panel)',
          border: `var(--border-width) solid var(--border)`,
          borderRadius: 'var(--modal-radius)',
          boxShadow: 'var(--shadow-md)',
          padding: '28px',
          width: '100%',
          maxWidth: '660px',
          animation: 'modal-in 300ms ease forwards',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-head)',
              color: 'var(--text-strong)',
              fontSize: '20px',
              fontWeight: 700,
              margin: 0,
            }}
          >
            Выбери тему оформления
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--muted)',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '4px 8px',
              lineHeight: 1,
              transition: 'color 0.15s',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)';
            }}
          >
            ✕
          </button>
        </div>

        {/* Theme grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '12px',
          }}
        >
          {THEME_ORDER.map((id) => {
            const Preview = PREVIEWS[id];
            const labelStyle = LABEL_STYLES[id];
            const isSelected = themeId === id;

            return (
              <div
                key={id}
                onClick={() => handleSelect(id)}
                style={{
                  cursor: 'pointer',
                  border: isSelected
                    ? '2px solid var(--accent)'
                    : '2px solid transparent',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    'translateY(0)';
                }}
              >
                {/* Selected checkmark */}
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      zIndex: 10,
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      color: 'var(--bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </div>
                )}

                <Preview />

                {/* Label */}
                <div style={labelStyle}>{THEMES[id].label}</div>
              </div>
            );
          })}
        </div>

        {/* Code style section */}
        <div
          style={{
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: `var(--border-width) solid var(--border)`,
          }}
        >
          {/* Header row with toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: codeOverride ? '16px' : '0',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-strong)',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Стиль блоков кода
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--muted)',
                  fontSize: '11px',
                }}
              >
                {codeOverride ? 'вручную' : 'из темы'}
              </span>
              {/* Toggle pill */}
              <div
                onClick={() => {
                  if (codeOverride) {
                    setCodeOverride(null);
                  } else {
                    setCodeOverride({
                      bg: theme.codeBg,
                      color: theme.codeColor,
                      fontFamily: theme.codeFontFamily,
                    });
                  }
                }}
                style={{
                  width: '40px',
                  height: '22px',
                  borderRadius: '11px',
                  background: codeOverride ? 'var(--muted)' : 'var(--accent)',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '3px',
                    left: codeOverride ? '3px' : '21px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: 'white',
                    transition: 'left 0.2s',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Custom controls — only when override is active */}
          {codeOverride && (
            <div
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
              }}
            >
              {/* Background color */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--muted)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Фон
                </span>
                <input
                  type="color"
                  value={codeOverride.bg}
                  onChange={(e) =>
                    setCodeOverride({ ...codeOverride, bg: e.target.value })
                  }
                  style={{
                    width: '48px',
                    height: '34px',
                    cursor: 'pointer',
                    border: `var(--border-width) solid var(--border)`,
                    borderRadius: 'var(--radius-sm)',
                    background: 'none',
                    padding: '2px',
                  }}
                />
              </div>

              {/* Text color */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--muted)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Цвет текста
                </span>
                <input
                  type="color"
                  value={codeOverride.color}
                  onChange={(e) =>
                    setCodeOverride({ ...codeOverride, color: e.target.value })
                  }
                  style={{
                    width: '48px',
                    height: '34px',
                    cursor: 'pointer',
                    border: `var(--border-width) solid var(--border)`,
                    borderRadius: 'var(--radius-sm)',
                    background: 'none',
                    padding: '2px',
                  }}
                />
              </div>

              {/* Font family */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  flex: 1,
                  minWidth: '140px',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--muted)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Шрифт
                </span>
                <select
                  value={codeOverride.fontFamily}
                  onChange={(e) =>
                    setCodeOverride({ ...codeOverride, fontFamily: e.target.value })
                  }
                  style={{
                    fontFamily: codeOverride.fontFamily,
                    background: 'var(--bg2)',
                    color: 'var(--text)',
                    border: `var(--border-width) solid var(--border)`,
                    borderRadius: 'var(--input-radius)',
                    padding: '7px 10px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  {FONT_OPTIONS.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Live preview */}
              <div
                style={{
                  flex: 1,
                  minWidth: '140px',
                  padding: '8px 12px',
                  background: codeOverride.bg,
                  borderRadius: 'var(--radius-sm)',
                  border: `var(--border-width) solid var(--border)`,
                  fontFamily: codeOverride.fontFamily,
                  color: codeOverride.color,
                  fontSize: '12px',
                  lineHeight: 1.6,
                  whiteSpace: 'pre',
                }}
              >
                {'const x = 42;\nreturn x * 2;'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
