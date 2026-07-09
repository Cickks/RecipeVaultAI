import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { AuthCredentials, parseAuthCredentials, parsePasswordResetEmail } from "./authValidation";

type AuthState = {
  error: string | null;
  initialized: boolean;
  isLoading: boolean;
  mode: "guest" | "signed-in";
  session: Session | null;
  user: User | null;
  clearError: () => void;
  initialize: () => (() => void) | undefined;
  resetPassword: (email: string) => Promise<boolean>;
  setMode: (mode: AuthState["mode"]) => void;
  signIn: (credentials: AuthCredentials) => Promise<boolean>;
  signOut: () => Promise<void>;
  signUp: (credentials: AuthCredentials) => Promise<boolean>;
};

const missingSupabaseMessage = "Supabase is not configured. Add Expo public Supabase values before using auth.";

function validationMessage(result: ReturnType<typeof parseAuthCredentials>) {
  return result.success ? null : result.error.issues[0]?.message ?? "Check your email and password.";
}

export const useAuthStore = create<AuthState>((set) => ({
  error: null,
  initialized: false,
  isLoading: false,
  mode: "guest",
  session: null,
  user: null,
  clearError: () => set({ error: null }),
  initialize: () => {
    if (!supabase) {
      set({ initialized: true, mode: "guest" });
      return undefined;
    }

    set({ isLoading: true });
    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (error) {
          set({ error: "Could not restore your session.", initialized: true, isLoading: false });
          return;
        }

        set({
          error: null,
          initialized: true,
          isLoading: false,
          mode: data.session ? "signed-in" : "guest",
          session: data.session,
          user: data.session?.user ?? null,
        });
      })
      .catch(() => {
        set({ error: "Could not restore your session.", initialized: true, isLoading: false });
      });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      set({
        mode: session ? "signed-in" : "guest",
        session,
        user: session?.user ?? null,
      });
    });

    return () => data.subscription.unsubscribe();
  },
  resetPassword: async (email) => {
    const result = parsePasswordResetEmail(email);
    if (!result.success) {
      set({ error: result.error.issues[0]?.message ?? "Enter a valid email address." });
      return false;
    }

    if (!supabase) {
      set({ error: missingSupabaseMessage });
      return false;
    }

    set({ error: null, isLoading: true });
    const { error } = await supabase.auth.resetPasswordForEmail(result.data);
    set({ error: error ? "Could not send a reset email." : null, isLoading: false });
    return !error;
  },
  setMode: (mode) => set({ mode }),
  signIn: async (credentials) => {
    const result = parseAuthCredentials(credentials);
    const message = validationMessage(result);
    if (!result.success || message) {
      set({ error: message });
      return false;
    }

    if (!supabase) {
      set({ error: missingSupabaseMessage });
      return false;
    }

    set({ error: null, isLoading: true });
    const { data, error } = await supabase.auth.signInWithPassword(result.data);
    set({
      error: error ? "Could not sign in with those credentials." : null,
      isLoading: false,
      mode: data.session ? "signed-in" : "guest",
      session: data.session,
      user: data.user,
    });
    return !error;
  },
  signOut: async () => {
    if (!supabase) {
      set({ mode: "guest", session: null, user: null });
      return;
    }

    set({ isLoading: true });
    await supabase.auth.signOut();
    set({ error: null, isLoading: false, mode: "guest", session: null, user: null });
  },
  signUp: async (credentials) => {
    const result = parseAuthCredentials(credentials);
    const message = validationMessage(result);
    if (!result.success || message) {
      set({ error: message });
      return false;
    }

    if (!supabase) {
      set({ error: missingSupabaseMessage });
      return false;
    }

    set({ error: null, isLoading: true });
    const { data, error } = await supabase.auth.signUp(result.data);
    set({
      error: error ? "Could not create an account with those details." : null,
      isLoading: false,
      mode: data.session ? "signed-in" : "guest",
      session: data.session,
      user: data.user,
    });
    return !error;
  },
}));
