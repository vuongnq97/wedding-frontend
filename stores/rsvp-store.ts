import { create } from 'zustand';

interface RsvpState {
  shouldFetch: number;
  triggerFetch: () => void;
}

export const useRsvpStore = create<RsvpState>((set) => ({
  shouldFetch: 0,
  triggerFetch: () => set({ shouldFetch: Date.now() }),
}));
