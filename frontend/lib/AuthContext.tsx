'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  authLogin,
  authLogout,
  authRefresh,
  authRegister,
  UserPublic,
} from './authApi';

interface AuthState {
  user: UserPublic | null;
  accessToken: string | null;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<string | null>;
  setUser: (user: UserPublic) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<UserPublic | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Serialize concurrent refresh calls into a single in-flight promise
  const refreshPromise = useRef<Promise<string | null> | null>(null);

  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    if (refreshPromise.current) return refreshPromise.current;

    refreshPromise.current = authRefresh().then((data) => {
      refreshPromise.current = null;
      if (!data) {
        setUserState(null);
        setAccessToken(null);
        return null;
      }
      setAccessToken(data.accessToken);
      return data.accessToken;
    });

    return refreshPromise.current;
  }, []);

  // Silent refresh on mount to restore session
  useEffect(() => {
    void refreshAccessToken().finally(() => setIsLoading(false));
  }, [refreshAccessToken]);

  const login = useCallback(async (email: string, password: string) => {
    const data = await authLogin(email, password);
    setAccessToken(data.accessToken);
    setUserState(data.user);
  }, []);

  const register = useCallback(
    async (email: string, password: string, username?: string) => {
      const data = await authRegister(email, password, username);
      setAccessToken(data.accessToken);
      setUserState(data.user);
    },
    [],
  );

  const logout = useCallback(async () => {
    await authLogout();
    setAccessToken(null);
    setUserState(null);
  }, []);

  const setUser = useCallback((u: UserPublic) => setUserState(u), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isLoading,
        login,
        register,
        logout,
        refreshAccessToken,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
