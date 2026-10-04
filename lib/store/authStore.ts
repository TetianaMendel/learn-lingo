import type { User } from "@/types/user";
import { create } from "zustand";

type AuthStore = {
  isAuthenticated: boolean;
  isAuthInitialized: boolean;
  user: User | null;

  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  setAuthInitialized: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  isAuthInitialized: false,
  user: null,

  setUser: (user: User) => {
    set(() => ({
      user,
      isAuthenticated: true,
    }));
  },

  clearIsAuthenticated: () => {
    set(() => ({
      user: null,
      isAuthenticated: false,
    }));
  },

  setAuthInitialized: (value: boolean) => {
    set(() => ({
      isAuthInitialized: value,
    }));
  },
}));