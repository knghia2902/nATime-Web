'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase, isMockEnabled } from './supabase';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  company: string;
  isMock: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    name: string,
    company: string
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updateProfile: (
    name: string,
    company: string
  ) => Promise<{ error: Error | null }>;
  updatePassword: (password: string) => Promise<{ error: Error | null }>;
  
  // Legacy support for dashboard
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER_KEY = 'natime-mock-user';
const MOCK_DB_KEY = 'natime-mock-users-db';

interface MockDBUser {
  id: string;
  email: string;
  password?: string;
  name: string;
  company: string;
}

function authenticationError(error: unknown): Error {
  return error instanceof Error ? error : new Error('Unexpected authentication error.');
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Backup URL hash before Supabase client clears it
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.includes('access_token=') && 
          (hash.includes('type=recovery') || hash.includes('type=invite') || hash.includes('type=signup'))) {
        sessionStorage.setItem('natime-auth-hash', hash);
      }
    }
  }, []);

  // Development-only mock storage starts empty; it never ships a shared account.
  const getMockDB = (): MockDBUser[] => {
    if (typeof window === 'undefined') return [];
    const db = localStorage.getItem(MOCK_DB_KEY);
    if (!db) {
      const defaultUsers: MockDBUser[] = [];
      localStorage.setItem(MOCK_DB_KEY, JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    try {
      return JSON.parse(db);
    } catch {
      return [];
    }
  };

  const saveMockDB = (db: MockDBUser[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(MOCK_DB_KEY, JSON.stringify(db));
    }
  };

  // Map Supabase User to unified AuthUser interface
  const mapSupabaseUser = (sbUser: User): AuthUser => {
    return {
      id: sbUser.id,
      email: sbUser.email || '',
      name: sbUser.user_metadata?.name || sbUser.user_metadata?.full_name || '',
      company: sbUser.user_metadata?.company || '',
      isMock: false,
    };
  };

  // Sync auth state
  useEffect(() => {
    if (isMockEnabled || !supabase) {
      // Mock flow
      const timer = window.setTimeout(() => {
        const stored = localStorage.getItem(MOCK_USER_KEY);
        if (stored) {
          try {
            setUser(JSON.parse(stored));
          } catch {
            localStorage.removeItem(MOCK_USER_KEY);
          }
        }
        setLoading(false);
      }, 0);
      return () => window.clearTimeout(timer);
    } else {
      // Supabase flow
      const initAuth = async () => {
        try {
          const { data: { session } } = await supabase!.auth.getSession();
          if (session?.user) {
            const mapped = mapSupabaseUser(session.user);
            setUser(mapped);
            localStorage.setItem('natime-user', JSON.stringify(mapped));
          } else {
            setUser(null);
            localStorage.removeItem('natime-user');
          }
        } catch (err) {
          console.error('Error getting Supabase session:', err);
        } finally {
          setLoading(false);
        }
      };

      initAuth();

      const { data: { subscription } } = supabase!.auth.onAuthStateChange(
        (event, session) => {
          if (session?.user) {
            const mapped = mapSupabaseUser(session.user);
            setUser(mapped);
            localStorage.setItem('natime-user', JSON.stringify(mapped));
            
            const storedHash = (typeof window !== 'undefined' ? sessionStorage.getItem('natime-auth-hash') : null) || '';
            const isRecoveryOrInvite = event === 'PASSWORD_RECOVERY' || 
                                       storedHash.includes('type=recovery') || 
                                       storedHash.includes('type=invite') ||
                                       (typeof window !== 'undefined' && 
                                        (window.location.hash.includes('type=recovery') || 
                                         window.location.hash.includes('type=invite')));

            if (isRecoveryOrInvite) {
              if (typeof window !== 'undefined') {
                sessionStorage.removeItem('natime-auth-hash');
                window.location.href = `/reset-password${window.location.hash || storedHash}`;
              }
            } else {
              if (typeof window !== 'undefined' && 
                  (window.location.hash.includes('access_token=') || 
                   window.location.search.includes('code=') ||
                   storedHash.includes('access_token='))) {
                sessionStorage.removeItem('natime-auth-hash');
                sessionStorage.setItem('natime-auth-redirect-success', 'true');
                window.location.href = '/portal';
              }
            }
          } else {
            setUser(null);
            localStorage.removeItem('natime-user');
          }
          setLoading(false);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      if (isMockEnabled || !supabase) {
        // Simulate loading time
        await new Promise((resolve) => setTimeout(resolve, 800));

        const db = getMockDB();
        const found = db.find(
          (u) =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password
        );

        if (!found) {
          return {
            error: new Error(
              'Email hoặc mật khẩu không đúng. Vui lòng kiểm tra lại.'
            ),
          };
        }

        const authenticatedUser: AuthUser = {
          id: found.id,
          email: found.email,
          name: found.name,
          company: found.company,
          isMock: true,
        };

        if (typeof window !== 'undefined') {
          localStorage.setItem(MOCK_USER_KEY, JSON.stringify(authenticatedUser));
        }
        setUser(authenticatedUser);
        return { error: null };
      } else {
        const { data, error } = await supabase!.auth.signInWithPassword({
          email,
          password,
        });

        if (error) return { error };
        if (data.user) {
          setUser(mapSupabaseUser(data.user));
        }
        return { error: null };
      }
    } catch (error: unknown) {
      return { error: authenticationError(error) };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    name: string,
    company: string
  ) => {
    setLoading(true);
    try {
      if (isMockEnabled || !supabase) {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const db = getMockDB();
        const exists = db.some(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );

        if (exists) {
          return { error: new Error('Email này đã được đăng ký sử dụng.') };
        }

        const newMockUser: MockDBUser = {
          id: `mock-${Math.random().toString(36).substr(2, 9)}`,
          email,
          password,
          name,
          company,
        };

        db.push(newMockUser);
        saveMockDB(db);

        const authenticatedUser: AuthUser = {
          id: newMockUser.id,
          email: newMockUser.email,
          name: newMockUser.name,
          company: newMockUser.company,
          isMock: true,
        };

        if (typeof window !== 'undefined') {
          localStorage.setItem(MOCK_USER_KEY, JSON.stringify(authenticatedUser));
        }
        setUser(authenticatedUser);
        return { error: null };
      } else {
        const { data, error } = await supabase!.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              company,
            },
          },
        });

        if (error) return { error };
        if (data.session?.user) {
          setUser(mapSupabaseUser(data.session.user));
        }
        return { error: null };
      }
    } catch (error: unknown) {
      return { error: authenticationError(error) };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      if (isMockEnabled || !supabase) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        if (typeof window !== 'undefined') {
          localStorage.removeItem(MOCK_USER_KEY);
        }
        setUser(null);
        return { error: null };
      } else {
        const { error } = await supabase!.auth.signOut();
        if (error) return { error };
        setUser(null);
        return { error: null };
      }
    } catch (error: unknown) {
      return { error: authenticationError(error) };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      if (isMockEnabled || !supabase) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const db = getMockDB();
        const exists = db.some(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );

        if (!exists) {
          return { error: new Error('Email không tồn tại trong hệ thống.') };
        }
        return { error: null };
      } else {
        const { error } = await supabase!.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) return { error };
        return { error: null };
      }
    } catch (error: unknown) {
      return { error: authenticationError(error) };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (name: string, company: string) => {
    setLoading(true);
    try {
      if (isMockEnabled || !supabase) {
        await new Promise((resolve) => setTimeout(resolve, 600));

        if (!user) {
          return { error: new Error('Người dùng chưa đăng nhập.') };
        }

        const db = getMockDB();
        const updatedDb = db.map((u) => {
          if (u.id === user.id) {
            return { ...u, name, company };
          }
          return u;
        });
        saveMockDB(updatedDb);

        const updatedUser: AuthUser = {
          ...user,
          name,
          company,
        };

        if (typeof window !== 'undefined') {
          localStorage.setItem(MOCK_USER_KEY, JSON.stringify(updatedUser));
        }
        setUser(updatedUser);
        return { error: null };
      } else {
        const { data, error } = await supabase!.auth.updateUser({
          data: { name, company },
        });

        if (error) return { error };
        if (data.user) {
          const { error: profileError } = await supabase!
            .from('portal_profiles')
            .upsert({ user_id: data.user.id, display_name: name, organization_name: company });
          if (profileError) return { error: profileError };
          setUser(mapSupabaseUser(data.user));
        }
        return { error: null };
      }
    } catch (error: unknown) {
      return { error: authenticationError(error) };
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (password: string) => {
    setLoading(true);
    try {
      if (isMockEnabled || !supabase) {
        await new Promise((resolve) => setTimeout(resolve, 600));
        return { error: null };
      } else {
        const { error } = await supabase!.auth.updateUser({
          password: password,
        });
        if (error) return { error };
        return { error: null };
      }
    } catch (error: unknown) {
      return { error: authenticationError(error) };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updateProfile,
        updatePassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
