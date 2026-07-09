import { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { colors, radii, spacing } from "@/theme/tokens";
import { Text } from "./Text";

type Props = {
  children: ReactNode;
  onPress?: () => void;
  tone?: "primary" | "secondary";
};

export function Button({ children, onPress, tone = "primary" }: Props) {
  const content =
    typeof children === "string" || typeof children === "number" ? (
      <Text style={tone === "primary" ? styles.primaryText : styles.secondaryText}>{children}</Text>
    ) : (
      <View style={styles.content}>{children}</View>
    );

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, styles[tone], pressed && styles.pressed]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: radii.lg,
    minHeight: 52,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  primary: {
    backgroundColor: colors.ink,
  },
  secondary: {
    backgroundColor: colors.mist,
  },
  pressed: {
    opacity: 0.82,
  },
  content: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  primaryText: {
    color: colors.paper,
    fontWeight: "800",
  },
  secondaryText: {
    color: colors.ink,
    fontWeight: "800",
  },
});
