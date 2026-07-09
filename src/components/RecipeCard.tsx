import { Image, Pressable, StyleSheet, View } from "react-native";
import { Heart, Timer } from "lucide-react-native";
import { colors, radii, spacing } from "@/theme/tokens";
import { Recipe } from "@/types/recipe";
import { Text } from "./Text";
import { TagChip } from "./TagChip";

type Props = {
  recipe: Recipe;
  onPress?: () => void;
};

export function RecipeCard({ recipe, onPress }: Props) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.card}>
      <Image source={{ uri: recipe.imageUrl }} style={styles.image} accessibilityLabel={`${recipe.title} photo`} />
      <View style={styles.body}>
        <View style={styles.row}>
          <Text variant="heading" style={styles.title}>
            {recipe.title}
          </Text>
          <Heart size={20} color={recipe.favorite ? colors.tomato : colors.cocoa} fill={recipe.favorite ? colors.tomato : "transparent"} />
        </View>
        <Text variant="caption">{recipe.description}</Text>
        <View style={styles.metaRow}>
          <Timer size={15} color={colors.cocoa} />
          <Text variant="caption">{recipe.prepMinutes + recipe.cookMinutes} min</Text>
          <Text variant="caption">{recipe.calories} cal</Text>
          <Text variant="caption">{recipe.protein}g protein</Text>
        </View>
        <View style={styles.tags}>
          {recipe.tags.slice(0, 3).map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.paper,
    borderRadius: radii.xl,
    overflow: "hidden",
    shadowColor: colors.ink,
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  image: {
    aspectRatio: 1.55,
    width: "100%",
  },
  body: {
    gap: spacing.sm,
    padding: spacing.lg,
  },
  row: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
});
