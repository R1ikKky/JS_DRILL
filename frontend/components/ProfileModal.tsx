'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { getProfile, ProfileData } from '@/lib/authApi';
import Link from 'next/link';

interface Props {
  open: boolean;
  onClose: () => void;
}

function XpBar({ xp, xpForNextLevel }: { xp: number; xpForNextLevel: number }) {
  const pct = Math.min(100, Math.round((xp / xpForNextLevel) * 100));
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ color: 'var(--muted)', fontSize: 11 }}>XP: {xp}</span>
        <span style={{ color: 'var(--muted)', fontSize: 11 }}>{xp} / {xpForNextLevel}</span>
      </div>
      <div style={{ height: 6, background: 'var(--bg)', borderRadius: 3, overflow: 'hidden', border: '1px solid var(--border)' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'var(--cyan)', transition: 'width 0.5s ease', borderRadius: 3 }} />
      </div>
    </div>
  );
}

export default function ProfileModal({ open, onClose }: Props) {
  const { user, accessToken, logout } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !accessToken) return;
    setLoading(true);
    getProfile(accessToken)
      .then(setProfile)
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, [open, accessToken]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

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
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--panel)',
          border: '1px solid var(--border)',
          padding: 28,
          width: '100%',
          maxWidth: 520,
          fontFamily: 'var(--font-body)',
          maxHeight: '90vh',
          overflowY: 'auto',
          animation: 'modal-in 280ms ease forwards',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <span style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Профиль
          </span>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: 18, cursor: 'pointer', lineHeight: 1, padding: '2px 6px' }}
          >
            ✕
          </button>
        </div>

        {loading && (
          <p style={{ color: 'var(--muted)', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>Загрузка...</p>
        )}

        {!loading && profile && (
          <>
            {/* User info */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
                <span style={{ color: 'var(--text)', fontSize: 16, fontWeight: 600 }}>{profile.username}</span>
                <span style={{
                  background: 'var(--cyan)', color: 'var(--bg)',
                  fontSize: 10, fontFamily: 'var(--font-mono)',
                  padding: '2px 7px', borderRadius: 4, letterSpacing: '0.1em',
                }}>LVL {profile.level}</span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: 12, marginBottom: 10 }}>{profile.email}</p>
              <XpBar xp={profile.xp} xpForNextLevel={profile.xpForNextLevel} />
              <p style={{ color: 'var(--muted)', fontSize: 11, marginTop: 6 }}>
                Всего ответов: {profile.totalAnswered}
              </p>
            </div>

            {/* Stats table */}
            {profile.stats.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ color: 'var(--muted)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Статистика по темам
                </p>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border)' }}>
                        <th style={{ textAlign: 'left', color: 'var(--muted)', padding: '4px 6px', fontWeight: 400, whiteSpace: 'nowrap' }}>Тема</th>
                        <th style={{ textAlign: 'center', color: 'var(--green)', padding: '4px 6px', fontWeight: 400 }}>✓</th>
                        <th style={{ textAlign: 'center', color: 'var(--amber)', padding: '4px 6px', fontWeight: 400 }}>~</th>
                        <th style={{ textAlign: 'center', color: 'var(--red)', padding: '4px 6px', fontWeight: 400 }}>✗</th>
                        <th style={{ textAlign: 'right', color: 'var(--cyan)', padding: '4px 6px', fontWeight: 400 }}>XP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profile.stats.map((s) => (
                        <tr
                          key={`${s.track}-${s.topic}`}
                          style={{ borderBottom: '1px solid var(--border)' }}
                        >
                          <td style={{ padding: '5px 6px', color: 'var(--text)' }}>
                            <span style={{ color: 'var(--muted)', fontSize: 10 }}>[{s.track}]</span>{' '}
                            {s.topic}
                          </td>
                          <td style={{ textAlign: 'center', color: 'var(--green)', padding: '5px 6px' }}>{s.correct}</td>
                          <td style={{ textAlign: 'center', color: 'var(--amber)', padding: '5px 6px' }}>{s.partial}</td>
                          <td style={{ textAlign: 'center', color: 'var(--red)', padding: '5px 6px' }}>{s.wrong}</td>
                          <td style={{ textAlign: 'right', color: 'var(--cyan)', padding: '5px 6px' }}>{s.totalXp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {profile.stats.length === 0 && (
              <p style={{ color: 'var(--muted)', fontSize: 13, textAlign: 'center', padding: '12px 0' }}>
                Пока нет статистики — решите первый вопрос!
              </p>
            )}
          </>
        )}

        {/* Logout */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={async () => { await logout(); onClose(); }}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--muted)',
              padding: '6px 14px',
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            Выйти
          </button>
          <span style={{ color: 'var(--muted)', fontSize: 11 }}>
            <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>← Главная</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
