import { StyleSheet, View } from "react-native";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { colors, radii, spacing } from "@/theme/tokens";

const cards = [
  ["Users", "Role-based user management and support tools."],
  ["Analytics", "DAU, MAU, saves, imports, searches, retention, and conversions."],
  ["Moderation", "Review public recipes, reports, comments, and creator profiles."],
  ["Feature Flags", "Gate AI import, OCR, premium features, and early access."],
  ["Subscriptions", "RevenueCat customer status and entitlement support."],
  ["Announcements", "In-app messages, release notes, and maintenance notices."],
];

export default function AdminScreen() {
  return (
    <Screen>
      <Text variant="title">Admin Dashboard</Text>
      <Text variant="caption">Future internal operations area. Production routes must enforce server-side admin authorization.</Text>
      {cards.map(([title, body]) => (
        <View key={title} style={styles.card}>
          <Text variant="heading">{title}</Text>
          <Text variant="caption">{body}</Text>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.paper,
    borderRadius: radii.lg,
    gap: spacing.sm,
    padding: spacing.lg,
  },
});
