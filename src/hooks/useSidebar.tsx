import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  toggle: () => void;
}

const useSidebar = create<SidebarStore>((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen }))
}));

export default useSidebar