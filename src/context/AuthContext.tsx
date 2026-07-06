import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { AuthSession } from '../types/sign';
import { exchangeGoogleCredential } from '../lib/signApi';

const STORAGE_KEY = 'sign_auth';

interface AuthContextValue {
  session: AuthSession | null;
  isLoading: boolean;
  loginWithGoogle: (credential: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadSession(): AuthSession | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => loadSession());
  const [isLoading] = useState(false);

  const loginWithGoogle = useCallback(async (credential: string) => {
    const res = await exchangeGoogleCredential(credential);
    const authSession: AuthSession = {
      token: res.token,
      email: res.email,
      name: res.name,
      expiresIn: res.expires_in,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(authSession));
    setSession(authSession);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({ session, isLoading, loginWithGoogle, logout }),
    [session, isLoading, loginWithGoogle, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
