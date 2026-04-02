'use client';

import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';

interface Props {
  onOpenProfile: () => void;
}

export default function UserBadge({ onOpenProfile }: Props) {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (!user) {
    return (
      <Link
        href="/login"
        style={{
          fontSize: 10,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          border: '1px solid var(--border)',
          color: 'var(--muted)',
          padding: '6px 12px',
          textDecoration: 'none',
          transition: 'all 0.15s',
          display: 'inline-block',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--cyan)';
          (e.currentTarget as HTMLAnchorElement).style.color = 'var(--cyan)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)';
          (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted)';
        }}
      >
        Войти
      </Link>
    );
  }

  // XP progress toward next level (0-100%)
  const xpForLevel = (lvl: number) => (lvl * (lvl + 1)) / 2 * 100;
  const xpNeeded = xpForLevel(user.level);
  const pct = Math.min(100, Math.round((user.xp / xpNeeded) * 100));

  return (
    <button
      onClick={onOpenProfile}
      style={{
        background: 'transparent',
        border: '1px solid var(--border)',
        color: 'var(--text)',
        padding: '6px 12px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        minWidth: 110,
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--cyan)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ fontSize: 11, color: 'var(--text)', maxWidth: 70, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {user.username}
        </span>
        <span style={{
          background: 'var(--cyan)', color: 'var(--bg)',
          fontSize: 9, fontFamily: 'var(--font-mono)',
          padding: '1px 5px', borderRadius: 3, letterSpacing: '0.08em',
          flexShrink: 0,
        }}>
          LVL {user.level}
        </span>
      </div>
      <div style={{ height: 3, background: 'var(--bg)', borderRadius: 2, overflow: 'hidden', width: '100%' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'var(--cyan)', borderRadius: 2 }} />
      </div>
    </button>
  );
}
