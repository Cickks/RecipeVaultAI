import { useEffect, useRef, useState } from "react";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { StyleSheet, TextInput } from "react-native";
import { Button } from "@/components/Button";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAuthStore } from "./useAuthStore";
import { colors, radii, spacing } from "@/theme/tokens";

type Props = {
  recovery?: boolean;
};

export function AuthCallbackScreen({ recovery = false }: Props) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [ready, setReady] = useState(false);
  const [updated, setUpdated] = useState(false);
  const handledUrl = useRef<string | null>(null);
  const url = Linking.useLinkingURL();
  const router = useRouter();
  const clearError = useAuthStore((state) => state.clearError);
  const completeAuthRedirect = useAuthStore((state) => state.completeAuthRedirect);
  const error = useAuthStore((state) => state.error);
  const isLoading = useAuthStore((state) => state.isLoading);
  const updatePassword = useAuthStore((state) => state.updatePassword);

  useEffect(() => {
    if (!url || handledUrl.current === url) return;

    handledUrl.current = url;
    clearError();
    completeAuthRedirect(url).then(setReady);
  }, [clearError, completeAuthRedirect, url]);

  async function submitPassword() {
    const succeeded = await updatePassword(password, confirmPassword);
    if (succeeded) setUpdated(true);
  }

  if (!url || (!ready && isLoading)) {
    return (
      <Screen>
        <Text variant="title">Finishing authentication</Text>
        <Text variant="caption">Securely validating your email link...</Text>
      </Screen>
    );
  }

  if (!ready) {
    return (
      <Screen>
        <Text variant="title">Link unavailable</Text>
        <Text variant="caption">{error ?? "This authentication link could not be completed."}</Text>
        <Button onPress={() => router.replace("/auth")}>Return to authentication</Button>
      </Screen>
    );
  }

  if (!recovery || updated) {
    return (
      <Screen>
        <Text variant="title">{updated ? "Password updated" : "Email verified"}</Text>
        <Text variant="caption">
          {updated ? "Your new password is ready to use." : "Your account is verified and securely signed in."}
        </Text>
        <Button onPress={() => router.replace("/(tabs)")}>Continue to Recipe Vault</Button>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text variant="title">Choose a new password</Text>
      <Text variant="caption">Use at least 8 characters and confirm it below.</Text>
      <TextInput
        accessibilityLabel="New password"
        autoComplete="new-password"
        onChangeText={setPassword}
        placeholder="New password"
        secureTextEntry
        style={styles.input}
        value={password}
      />
      <TextInput
        accessibilityLabel="Confirm new password"
        autoComplete="new-password"
        onChangeText={setConfirmPassword}
        placeholder="Confirm new password"
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button disabled={isLoading} onPress={submitPassword}>
        {isLoading ? "Updating..." : "Update password"}
      </Button>
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
  error: {
    color: colors.tomato,
    fontWeight: "800",
  },
});
