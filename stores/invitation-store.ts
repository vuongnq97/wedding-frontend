import { create } from 'zustand';
import { WeddingData } from '@/types/invitation';

interface InvitationState {
  data: WeddingData | null;
  setData: (data: WeddingData) => void;
  updateField: (path: (string | number)[], value: unknown) => void;
  reset: () => void;
}

export const useInvitationStore = create<InvitationState>((set) => ({
  data: null,
  setData: (data) => set({ data }),
  updateField: (path, value) =>
    set((state) => {
      const newData = { ...state.data };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let current: any = newData;
      for (let i = 0; i < path.length - 1; i++) {
        // Create nested object if it doesn't exist (though strictly mostly should)
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return { data: newData as WeddingData };
    }),
  reset: () => set({ data: null }),
}));
