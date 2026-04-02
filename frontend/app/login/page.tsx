'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useTheme } from '@/lib/ThemeContext';

export default function LoginPage() {
  const { login } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--bg)',
    border: `1px solid var(--border)`,
    color: 'var(--text)',
    padding: '10px 14px',
    borderRadius: 6,
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        fontFamily: 'var(--font-body)',
      }}
    >
      <div
        style={{
          background: 'var(--panel)',
          border: `1px solid var(--border)`,
          borderRadius: 12,
          padding: '40px 36px',
          width: '100%',
          maxWidth: 400,
        }}
      >
        <h1
          style={{
            color: 'var(--cyan)',
            fontFamily: 'var(--font-mono)',
            fontSize: 22,
            marginBottom: 28,
            textAlign: 'center',
          }}
        >
          JS DRILL — Войти
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ color: 'var(--muted)', fontSize: 12, display: 'block', marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ color: 'var(--muted)', fontSize: 12, display: 'block', marginBottom: 6 }}>
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              style={inputStyle}
            />
          </div>

          {error && (
            <div style={{ color: 'var(--red)', fontSize: 13 }}>{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: 'var(--cyan)',
              color: 'var(--bg)',
              border: 'none',
              borderRadius: 6,
              padding: '11px 0',
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              marginTop: 4,
            }}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <p style={{ color: 'var(--muted)', fontSize: 13, textAlign: 'center', marginTop: 24 }}>
          Нет аккаунта?{' '}
          <Link href="/register" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>
            Зарегистрироваться
          </Link>
        </p>
        <p style={{ color: 'var(--muted)', fontSize: 13, textAlign: 'center', marginTop: 8 }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
            ← Вернуться к тренировке
          </Link>
        </p>
      </div>
    </div>
  );
}
