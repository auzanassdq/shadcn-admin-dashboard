import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  // onOpen: () => void;
  // onClose: () => void;
  toggle: () => void;
}

const useSidebar = create<SidebarStore>((set) => ({
  isOpen: true,
  // onOpen: () => set({ isOpen: true }),
  // onClose: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen }))
}));

export default useSidebar