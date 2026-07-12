import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@/components/Button";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAuthStore } from "@/features/auth/useAuthStore";
import { colors, radii, spacing } from "@/theme/tokens";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState<"forgot" | "login" | "register">("register");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const router = useRouter();
  const authMode = useAuthStore((state) => state.mode);
  const clearError = useAuthStore((state) => state.clearError);
  const error = useAuthStore((state) => state.error);
  const isLoading = useAuthStore((state) => state.isLoading);
  const resendVerification = useAuthStore((state) => state.resendVerification);
  const resetPassword = useAuthStore((state) => state.resetPassword);
  const signIn = useAuthStore((state) => state.signIn);
  const signUp = useAuthStore((state) => state.signUp);

  useEffect(() => {
    if (authMode === "signed-in") {
      router.replace("/(tabs)");
    }
  }, [authMode, router]);

  async function submit() {
    clearError();
    setNotice(null);

    if (mode === "forgot") {
      const sent = await resetPassword(email);
      if (sent) {
        setNotice("Password reset instructions are on the way if this email has an account.");
      }
      return;
    }

    const succeeded = mode === "register" ? await signUp({ email, password }) : await signIn({ email, password });
    if (succeeded && mode === "register") {
      setVerificationSent(true);
      setNotice("Check your email to verify your account before signing in.");
    }
  }

  async function resend() {
    clearError();
    setNotice(null);
    const sent = await resendVerification(email);
    if (sent) setNotice("A new verification email is on the way.");
  }

  return (
    <Screen>
      <Text variant="title">{mode === "register" ? "Create your cookbook" : mode === "login" ? "Welcome back" : "Reset password"}</Text>
      <Text variant="caption">Supabase Auth handles secure sessions, email verification, and password recovery.</Text>
      <TextInput
        accessibilityLabel="Email"
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
        value={email}
      />
      {mode !== "forgot" ? (
        <TextInput
          accessibilityLabel="Password"
          autoComplete={mode === "register" ? "new-password" : "password"}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
        />
      ) : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {notice ? <Text style={styles.notice}>{notice}</Text> : null}
      <Button disabled={isLoading} onPress={submit}>
        {isLoading ? "Working..." : mode === "register" ? "Create account" : mode === "login" ? "Log in" : "Send reset email"}
      </Button>
      {mode === "register" && verificationSent ? (
        <Button disabled={isLoading} tone="secondary" onPress={resend}>
          Resend verification email
        </Button>
      ) : null}
      {mode !== "forgot" ? (
        <Button tone="secondary" onPress={() => setMode(mode === "register" ? "login" : "register")}>
          {mode === "register" ? "I already have an account" : "Create a new account"}
        </Button>
      ) : null}
      <Button tone="secondary" onPress={() => setMode(mode === "forgot" ? "login" : "forgot")}>
        {mode === "forgot" ? "Back to login" : "Forgot password"}
      </Button>
      <View style={styles.note}>
        <Text variant="heading">Secure by default</Text>
        <Text variant="caption">Auth stays disabled until Supabase environment values are configured. No secrets belong in source control.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.paper,
    borderRadius: radii.lg,
    color: colors.ink,
    fontSize: 16,
    minHeight: 56,
    paddingHorizontal: spacing.lg,
  },
  note: {
    backgroundColor: colors.mist,
    borderRadius: radii.lg,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  error: {
    color: colors.tomato,
    fontWeight: "800",
  },
  notice: {
    color: colors.sage,
    fontWeight: "800",
  },
});
