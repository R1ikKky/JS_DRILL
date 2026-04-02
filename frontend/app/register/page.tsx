'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) {
      setError('Пароль должен быть не менее 8 символов');
      return;
    }
    setLoading(true);
    try {
      await register(email, password, username || undefined);
      router.push('/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации');
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
          JS DRILL — Регистрация
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ color: 'var(--muted)', fontSize: 12, display: 'block', marginBottom: 6 }}>
              Email *
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
              Ник (необязательно)
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={40}
              disabled={loading}
              placeholder="anonymous"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ color: 'var(--muted)', fontSize: 12, display: 'block', marginBottom: 6 }}>
              Пароль * (мин. 8 символов)
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
            {loading ? 'Создание...' : 'Создать аккаунт'}
          </button>
        </form>

        <p style={{ color: 'var(--muted)', fontSize: 13, textAlign: 'center', marginTop: 24 }}>
          Уже есть аккаунт?{' '}
          <Link href="/login" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>
            Войти
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
