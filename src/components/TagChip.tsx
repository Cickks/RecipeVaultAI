import { StyleSheet, View } from "react-native";
import { colors, radii, spacing } from "@/theme/tokens";
import { Text } from "./Text";

export function TagChip({ label }: { label: string }) {
  return (
    <View style={styles.chip}>
      <Text variant="caption" style={styles.text}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.mist,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  text: {
    color: colors.cocoa,
    fontWeight: "700",
  },
});
