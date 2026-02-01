
import { create } from "zustand";
import { persist } from "zustand/middleware";


export type User = {
  id: number;
  name: string;
  role: "superadmin" | "manager";
  privileges: any;
};

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ 
        user: state.user 
      }),
    }
  )
);