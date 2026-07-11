'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { supabase, isMockEnabled } from './supabase';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  company: string;
  isMock: boolean;
  avatar?: string;
  supportTier?: string;
  daysRemaining?: number;
  activeLicenses?: number;
  openTickets?: number;
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
  
  // Legacy support for dashboard
  login: (email: string) => Promise<void>;
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
  avatar?: string;
  supportTier?: string;
  daysRemaining?: number;
  activeLicenses?: number;
  openTickets?: number;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize mock database with a demo account if not exists
  const getMockDB = (): MockDBUser[] => {
    if (typeof window === 'undefined') return [];
    const db = localStorage.getItem(MOCK_DB_KEY);
    if (!db) {
      const defaultUsers: MockDBUser[] = [
        {
          id: 'demo-user-id',
          email: 'demo@natime.xyz',
          password: 'password123',
          name: 'Demo User',
          company: 'nATime Corp',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
          supportTier: 'Enterprise Support',
          daysRemaining: 185,
          activeLicenses: 8,
          openTickets: 1,
        },
      ];
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
  const mapSupabaseUser = (sbUser: any): AuthUser => {
    return {
      id: sbUser.id,
      email: sbUser.email || '',
      name: sbUser.user_metadata?.name || sbUser.user_metadata?.full_name || '',
      company: sbUser.user_metadata?.company || '',
      isMock: false,
      avatar: sbUser.user_metadata?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
      supportTier: sbUser.user_metadata?.supportTier || 'Enterprise Support',
      daysRemaining: sbUser.user_metadata?.daysRemaining || 185,
      activeLicenses: sbUser.user_metadata?.activeLicenses || 8,
      openTickets: sbUser.user_metadata?.openTickets || 1,
    };
  };

  // Sync auth state
  useEffect(() => {
    if (isMockEnabled || !supabase) {
      // Mock flow
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(MOCK_USER_KEY);
        if (stored) {
          try {
            setUser(JSON.parse(stored));
          } catch {
            localStorage.removeItem(MOCK_USER_KEY);
          }
        }
      }
      setLoading(false);
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
        (_event, session) => {
          if (session?.user) {
            const mapped = mapSupabaseUser(session.user);
            setUser(mapped);
            localStorage.setItem('natime-user', JSON.stringify(mapped));
            
            // Auto redirect to dashboard when invite/recovery/login confirmation link is clicked
            if (typeof window !== 'undefined' && 
                (window.location.hash.includes('access_token=') || 
                 window.location.search.includes('code='))) {
              window.location.href = '/dashboard';
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
              'Email hoặc mật khẩu không đúng. Vui lòng kiểm tra lại. (Sử dụng demo@natime.xyz / password123)'
            ),
          };
        }

        const authenticatedUser: AuthUser = {
          id: found.id,
          email: found.email,
          name: found.name,
          company: found.company,
          isMock: true,
          avatar: found.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
          supportTier: found.supportTier || 'Enterprise Support',
          daysRemaining: found.daysRemaining || 185,
          activeLicenses: found.activeLicenses || 8,
          openTickets: found.openTickets || 1,
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
    } catch (err: any) {
      return { error: err || new Error('Đã xảy ra lỗi không xác định.') };
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
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
          supportTier: 'Enterprise Support',
          daysRemaining: 185,
          activeLicenses: 8,
          openTickets: 1,
        };

        db.push(newMockUser);
        saveMockDB(db);

        const authenticatedUser: AuthUser = {
          id: newMockUser.id,
          email: newMockUser.email,
          name: newMockUser.name,
          company: newMockUser.company,
          isMock: true,
          avatar: newMockUser.avatar,
          supportTier: newMockUser.supportTier,
          daysRemaining: newMockUser.daysRemaining,
          activeLicenses: newMockUser.activeLicenses,
          openTickets: newMockUser.openTickets,
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
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
              supportTier: 'Enterprise Support',
              daysRemaining: 185,
              activeLicenses: 8,
              openTickets: 1,
            },
          },
        });

        if (error) return { error };
        if (data.user) {
          setUser(mapSupabaseUser(data.user));
        }
        return { error: null };
      }
    } catch (err: any) {
      return { error: err || new Error('Đã xảy ra lỗi không xác định.') };
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
    } catch (err: any) {
      return { error: err || new Error('Đã xảy ra lỗi không xác định.') };
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
    } catch (err: any) {
      return { error: err || new Error('Đã xảy ra lỗi không xác định.') };
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
          setUser(mapSupabaseUser(data.user));
        }
        return { error: null };
      }
    } catch (err: any) {
      return { error: err || new Error('Đã xảy ra lỗi không xác định.') };
    } finally {
      setLoading(false);
    }
  };

  // Legacy support methods mapping
  const login = async (email: string) => {
    const db = getMockDB();
    const found = db.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    // In legacy mode, we just let them login with a default password or register them automatically if not exists
    if (found) {
      await signIn(email, found.password || 'password123');
    } else {
      await signUp(email, 'password123', 'Demo User', 'nATime Corp');
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
        login,
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
