import { create } from "zustand";

type AuthState = {
  mode: "guest" | "signed-in";
  setMode: (mode: AuthState["mode"]) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  mode: "guest",
  setMode: (mode) => set({ mode }),
}));
