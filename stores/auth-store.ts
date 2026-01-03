import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { UserInfo } from '@/types/auth';

type AuthState = {
  user: UserInfo | null;
  accessToken: string | null;
  setUser: (user: UserInfo | null) => void;
  setAccessToken: (accessToken: string) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setUser: (user) => set({ user }),
      setAccessToken: (accessToken) => set({ accessToken }),
      clearAuth: () => set({ user: null, accessToken: null }),
    }),
    {
      name: 'auth-user',
    }
  )
);
