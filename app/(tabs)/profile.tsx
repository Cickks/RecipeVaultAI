import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button } from "@/components/Button";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAuthStore } from "@/features/auth/useAuthStore";
import { colors, radii, spacing } from "@/theme/tokens";

export default function ProfileScreen() {
  const mode = useAuthStore((state) => state.mode);
  const signOut = useAuthStore((state) => state.signOut);
  const user = useAuthStore((state) => state.user);

  return (
    <Screen>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>RV</Text>
        </View>
        <Text variant="title">{user?.email ?? "RecipeVault AI"}</Text>
        <Text variant="caption">
          {mode === "signed-in"
            ? "Free plan. Pro unlocks AI import, OCR, nutrition estimation, exports, and smart grocery lists."
            : "Sign in to sync your cookbook, profile, favorites, meal plans, and future Pro entitlements."}
        </Text>
      </View>
      <Button tone="secondary">Edit profile</Button>
      <Button tone="secondary">Notification settings</Button>
      <Button tone="secondary">Dark mode: system</Button>
      <Link href="/admin" asChild>
        <Button tone="secondary">Admin dashboard preview</Button>
      </Link>
      {mode === "signed-in" ? (
        <Button onPress={signOut}>Sign out</Button>
      ) : (
        <Link href="/auth" asChild>
          <Button>Sign in or create account</Button>
        </Link>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    alignItems: "center",
    backgroundColor: colors.paper,
    borderRadius: radii.xl,
    gap: spacing.md,
    padding: spacing.xl,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: colors.ink,
    borderRadius: 42,
    height: 84,
    justifyContent: "center",
    width: 84,
  },
  avatarText: {
    color: colors.paper,
    fontSize: 28,
    fontWeight: "900",
  },
});
