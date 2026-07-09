import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@/components/Button";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAuthStore } from "@/features/auth/useAuthStore";
import { colors, radii, spacing } from "@/theme/tokens";

export default function AuthScreen() {
  const [mode, setMode] = useState<"login" | "register">("register");
  const router = useRouter();
  const setAuthMode = useAuthStore((state) => state.setMode);

  return (
    <Screen>
      <Text variant="title">{mode === "register" ? "Create your cookbook" : "Welcome back"}</Text>
      <Text variant="caption">Supabase Auth will handle email verification, password reset, and secure sessions.</Text>
      <TextInput accessibilityLabel="Email" autoCapitalize="none" keyboardType="email-address" placeholder="Email" style={styles.input} />
      <TextInput accessibilityLabel="Password" placeholder="Password" secureTextEntry style={styles.input} />
      <Button
        onPress={() => {
          setAuthMode("signed-in");
          router.replace("/(tabs)");
        }}
      >
        {mode === "register" ? "Create account" : "Log in"}
      </Button>
      <Button tone="secondary" onPress={() => setMode(mode === "register" ? "login" : "register")}>
        {mode === "register" ? "I already have an account" : "Create a new account"}
      </Button>
      <View style={styles.note}>
        <Text variant="heading">Forgot password and email verification</Text>
        <Text variant="caption">These routes should call `supabase.auth.resetPasswordForEmail` and rely on Supabase email verification before production.</Text>
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
});
