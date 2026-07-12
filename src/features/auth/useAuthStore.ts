import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { AUTH_CALLBACK_URL, parseAuthDeepLink, PASSWORD_RECOVERY_URL } from "./authDeepLink";
import { AuthCredentials, parseAuthCredentials, parsePasswordResetEmail, parsePasswordUpdate } from "./authValidation";

type AuthState = {
  error: string | null;
  initialized: boolean;
  isLoading: boolean;
  mode: "guest" | "signed-in";
  session: Session | null;
  user: User | null;
  clearError: () => void;
  completeAuthRedirect: (url: string) => Promise<boolean>;
  initialize: () => (() => void) | undefined;
  resendVerification: (email: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  setMode: (mode: AuthState["mode"]) => void;
  signIn: (credentials: AuthCredentials) => Promise<boolean>;
  signOut: () => Promise<void>;
  signUp: (credentials: AuthCredentials) => Promise<boolean>;
  updatePassword: (password: string, confirmPassword: string) => Promise<boolean>;
};

const missingSupabaseMessage = "Supabase is not configured. Add Expo public Supabase values before using auth.";

function validationMessage(result: ReturnType<typeof parseAuthCredentials>) {
  return result.success ? null : result.error.issues[0]?.message ?? "Check your email and password.";
}

function authErrorMessage(fallback: string, message?: string) {
  if (!message) return fallback;

  const normalized = message.toLowerCase();
  if (normalized.includes("rate limit") || normalized.includes("too many")) {
    return "Too many auth attempts. Wait a minute, then try again.";
  }
  if (normalized.includes("invalid email")) {
    return "Enter a real email address that can receive verification mail.";
  }
  if (normalized.includes("password")) {
    return "The password does not meet the security requirements.";
  }

  return fallback;
}

export const useAuthStore = create<AuthState>((set) => ({
  error: null,
  initialized: false,
  isLoading: false,
  mode: "guest",
  session: null,
  user: null,
  clearError: () => set({ error: null }),
  completeAuthRedirect: async (url) => {
    if (!supabase) {
      set({ error: missingSupabaseMessage });
      return false;
    }

    const callback = parseAuthDeepLink(url);
    if (callback.errorDescription) {
      set({ error: "This authentication link is invalid or has expired." });
      return false;
    }

    set({ error: null, isLoading: true });
    const result = callback.code
      ? await supabase.auth.exchangeCodeForSession(callback.code)
      : callback.accessToken && callback.refreshToken
        ? await supabase.auth.setSession({ access_token: callback.accessToken, refresh_token: callback.refreshToken })
        : { data: { session: null, user: null }, error: new Error("Missing authentication callback credentials.") };

    set({
      error: result.error ? "This authentication link is invalid or has expired." : null,
      isLoading: false,
      mode: result.data.session ? "signed-in" : "guest",
      session: result.data.session,
      user: result.data.session?.user ?? null,
    });
    return !result.error && Boolean(result.data.session);
  },
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
  resendVerification: async (email) => {
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
    const { error } = await supabase.auth.resend({
      email: result.data,
      options: { emailRedirectTo: AUTH_CALLBACK_URL },
      type: "signup",
    });
    set({ error: error ? authErrorMessage("Could not resend the verification email.", error.message) : null, isLoading: false });
    return !error;
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
    const { error } = await supabase.auth.resetPasswordForEmail(result.data, { redirectTo: PASSWORD_RECOVERY_URL });
    set({ error: error ? authErrorMessage("Could not send a reset email.", error.message) : null, isLoading: false });
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
      error: error ? authErrorMessage("Could not sign in with those credentials.", error.message) : null,
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
    const { data, error } = await supabase.auth.signUp({
      ...result.data,
      options: { emailRedirectTo: AUTH_CALLBACK_URL },
    });
    set({
      error: error ? authErrorMessage("Could not create an account with those details.", error.message) : null,
      isLoading: false,
      mode: data.session ? "signed-in" : "guest",
      session: data.session,
      user: data.user,
    });
    return !error;
  },
  updatePassword: async (password, confirmPassword) => {
    const result = parsePasswordUpdate({ confirmPassword, password });
    if (!result.success) {
      set({ error: result.error.issues[0]?.message ?? "Check your new password." });
      return false;
    }

    if (!supabase) {
      set({ error: missingSupabaseMessage });
      return false;
    }

    set({ error: null, isLoading: true });
    const { error } = await supabase.auth.updateUser({ password: result.data.password });
    set({ error: error ? authErrorMessage("Could not update your password.", error.message) : null, isLoading: false });
    return !error;
  },
}));
