import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Link } from "expo-router";
import { RecipeCard } from "@/components/RecipeCard";
import { Screen } from "@/components/Screen";
import { TagChip } from "@/components/TagChip";
import { Text } from "@/components/Text";
import { useRecipes } from "@/features/recipes/useRecipes";
import { colors, radii, spacing } from "@/theme/tokens";

const filters = ["High Protein", "Italian", "Under 500 cal", "Favorites", "Quick", "Vegetarian"];

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const recipes = useRecipes(query);

  return (
    <Screen>
      <Text variant="title">Smart Search</Text>
      <TextInput
        accessibilityLabel="Search recipes"
        placeholder="Chicken under 500 calories"
        placeholderTextColor={colors.cocoa}
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <View style={styles.filters}>
        {filters.map((filter) => (
          <TagChip key={filter} label={filter} />
        ))}
      </View>
      {recipes.map((recipe) => (
        <Link key={recipe.id} href={`/recipe/${recipe.id}`} asChild>
          <RecipeCard recipe={recipe} />
        </Link>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.paper,
    borderRadius: radii.xl,
    color: colors.ink,
    fontSize: 18,
    minHeight: 58,
    paddingHorizontal: spacing.lg,
  },
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
});
