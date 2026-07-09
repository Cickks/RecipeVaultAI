import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Check } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { colors, radii, spacing } from "@/theme/tokens";

const initialItems = ["Sweet potatoes", "Chickpeas", "Tahini", "Greek yogurt", "Strawberries", "Whole peeled tomatoes"];

export default function GroceryScreen() {
  const [checked, setChecked] = useState<string[]>(["Tahini"]);

  return (
    <Screen>
      <Text variant="title">Grocery List</Text>
      <Text variant="caption">Merged from meal plans and recipes. Smart aisle grouping comes next.</Text>
      {initialItems.map((item) => {
        const isChecked = checked.includes(item);
        return (
          <Pressable
            key={item}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: isChecked }}
            onPress={() => setChecked((value) => (isChecked ? value.filter((i) => i !== item) : [...value, item]))}
            style={styles.item}
          >
            <View style={[styles.box, isChecked && styles.boxChecked]}>{isChecked ? <Check color={colors.paper} size={18} /> : null}</View>
            <Text style={isChecked && styles.checkedText}>{item}</Text>
          </Pressable>
        );
      })}
      <Button>Share grocery list</Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    backgroundColor: colors.paper,
    borderRadius: radii.lg,
    flexDirection: "row",
    gap: spacing.md,
    minHeight: 58,
    padding: spacing.lg,
  },
  box: {
    alignItems: "center",
    borderColor: colors.sage,
    borderRadius: 10,
    borderWidth: 2,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  boxChecked: {
    backgroundColor: colors.sage,
  },
  checkedText: {
    color: colors.cocoa,
    textDecorationLine: "line-through",
  },
});
