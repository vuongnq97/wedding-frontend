import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { UserInfo } from '@/types/auth';

type AuthState = {
  user: UserInfo | null;
  hasWedding: boolean;
  setUser: (user: UserInfo | null) => void;
  setHasWedding: (hasWedding: boolean) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hasWedding: false,
      setUser: (user) => set({ user }),
      setHasWedding: (hasWedding) => set({ hasWedding }),
      clearAuth: () => {
        set({ user: null, hasWedding: false });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-user');
        }
      },
    }),
    {
      name: 'auth-user',
    }
  )
);
