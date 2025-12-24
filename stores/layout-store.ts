import {create} from "zustand";

interface LayoutState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({sidebarOpen: !state.sidebarOpen})),
  closeSidebar: () => set({sidebarOpen: false}),
}));
