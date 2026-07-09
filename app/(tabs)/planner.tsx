import { StyleSheet, View } from "react-native";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { colors, radii, spacing } from "@/theme/tokens";

const days = [
  ["Mon", "Golden Harvest Bowl"],
  ["Tue", "Sunday Tomato Sugo"],
  ["Wed", "Open"],
  ["Thu", "Strawberry Protein Oats"],
  ["Fri", "Open"],
  ["Sat", "Family night"],
  ["Sun", "Prep day"],
];

export default function PlannerScreen() {
  return (
    <Screen>
      <Text variant="title">Meal Planner</Text>
      <Text variant="caption">Plan the week, then generate a grocery list automatically.</Text>
      {days.map(([day, meal]) => (
        <View key={day} style={styles.day}>
          <View style={styles.dayBadge}>
            <Text style={styles.dayText}>{day}</Text>
          </View>
          <View>
            <Text variant="heading">{meal}</Text>
            <Text variant="caption">Dinner</Text>
          </View>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  day: {
    alignItems: "center",
    backgroundColor: colors.paper,
    borderRadius: radii.lg,
    flexDirection: "row",
    gap: spacing.lg,
    padding: spacing.lg,
  },
  dayBadge: {
    alignItems: "center",
    backgroundColor: colors.mist,
    borderRadius: radii.md,
    height: 52,
    justifyContent: "center",
    width: 58,
  },
  dayText: {
    color: colors.tomato,
    fontWeight: "900",
  },
});
