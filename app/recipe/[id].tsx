import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { ArrowLeft, Heart, Pencil } from "lucide-react-native";
import { Button } from "@/components/Button";
import { Screen } from "@/components/Screen";
import { TagChip } from "@/components/TagChip";
import { Text } from "@/components/Text";
import { sampleRecipes } from "@/data/sampleRecipes";
import { colors, radii, spacing } from "@/theme/tokens";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const recipe = sampleRecipes.find((item) => item.id === id) ?? sampleRecipes[0];

  return (
    <Screen>
      <Button tone="secondary" onPress={() => router.back()}>
        <ArrowLeft color={colors.ink} size={18} /> Back
      </Button>
      <Image source={{ uri: recipe.imageUrl }} style={styles.image} accessibilityLabel={`${recipe.title} image`} />
      <View style={styles.titleRow}>
        <View style={{ flex: 1 }}>
          <Text variant="title">{recipe.title}</Text>
          <Text variant="caption">
            {recipe.cuisine} • {recipe.prepMinutes + recipe.cookMinutes} min • {recipe.servings} servings
          </Text>
        </View>
        <Heart color={colors.tomato} fill={recipe.favorite ? colors.tomato : "transparent"} size={26} />
      </View>
      <Text>{recipe.description}</Text>
      <View style={styles.tags}>
        {recipe.tags.map((tag) => (
          <TagChip key={tag} label={tag} />
        ))}
      </View>
      <View style={styles.nutrition}>
        {[
          ["Calories", recipe.calories],
          ["Protein", `${recipe.protein}g`],
          ["Carbs", `${recipe.carbs}g`],
          ["Fat", `${recipe.fat}g`],
        ].map(([label, value]) => (
          <View key={label} style={styles.nutritionItem}>
            <Text variant="heading">{value}</Text>
            <Text variant="caption">{label}</Text>
          </View>
        ))}
      </View>
      <Text variant="heading">Ingredients</Text>
      {recipe.ingredients.map((ingredient) => (
        <View key={ingredient.id} style={styles.rowCard}>
          <Text variant="label">{ingredient.amount}</Text>
          <Text>{ingredient.name}</Text>
        </View>
      ))}
      <Text variant="heading">Directions</Text>
      {recipe.instructions.map((step, index) => (
        <View key={step.id} style={styles.stepCard}>
          <Text variant="label">Step {index + 1}</Text>
          <Text>{step.body}</Text>
          {step.timerMinutes ? <Text variant="caption">Timer: {step.timerMinutes} min</Text> : null}
        </View>
      ))}
      <Button>
        <Pencil color={colors.paper} size={18} /> Edit recipe
      </Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1.05,
    borderRadius: radii.xl,
    width: "100%",
  },
  titleRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing.md,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  nutrition: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  nutritionItem: {
    backgroundColor: colors.paper,
    borderRadius: radii.lg,
    flexGrow: 1,
    minWidth: "42%",
    padding: spacing.lg,
  },
  rowCard: {
    backgroundColor: colors.paper,
    borderRadius: radii.lg,
    gap: spacing.xs,
    padding: spacing.lg,
  },
  stepCard: {
    backgroundColor: colors.paper,
    borderRadius: radii.lg,
    gap: spacing.sm,
    padding: spacing.lg,
  },
});
