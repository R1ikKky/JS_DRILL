const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3001';

export interface UserPublic {
  id: string;
  email: string;
  username: string;
  level: number;
  xp: number;
  preferredTheme: string;
}

export interface ProfileData extends UserPublic {
  xpForNextLevel: number;
  totalAnswered: number;
  stats: TopicStat[];
}

export interface TopicStat {
  track: string;
  topic: string;
  correct: number;
  partial: number;
  wrong: number;
  totalXp: number;
}

async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${BACKEND}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw Object.assign(new Error(body.message ?? 'Request failed'), { status: res.status });
  }
  return res.status === 204 ? null : res.json();
}

export async function authRegister(
  email: string,
  password: string,
  username?: string,
): Promise<{ accessToken: string; user: UserPublic }> {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, username }),
  });
}

export async function authLogin(
  email: string,
  password: string,
): Promise<{ accessToken: string; user: UserPublic }> {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function authRefresh(): Promise<{ accessToken: string } | null> {
  try {
    return await apiFetch('/auth/refresh', { method: 'POST' });
  } catch {
    return null;
  }
}

export async function authLogout(): Promise<void> {
  await apiFetch('/auth/logout', { method: 'POST' });
}

export async function getProfile(
  accessToken: string,
): Promise<ProfileData> {
  return apiFetch('/profile/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export async function updateTheme(
  theme: string,
  accessToken: string,
): Promise<void> {
  await apiFetch('/profile/theme', {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ theme }),
  });
}
