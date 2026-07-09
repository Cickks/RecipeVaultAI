import { Link } from "expo-router";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Sparkles } from "lucide-react-native";
import { RecipeCard } from "@/components/RecipeCard";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { colors, radii, spacing } from "@/theme/tokens";
import { sampleRecipes } from "@/data/sampleRecipes";

export default function HomeScreen() {
  const heroRecipe = sampleRecipes[0];

  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <Text variant="caption">Good evening</Text>
          <Text variant="title">What are we saving tonight?</Text>
        </View>
        <Link href="/profile" asChild>
          <View accessibilityRole="button" style={styles.avatar}>
            <Text style={styles.avatarText}>RV</Text>
          </View>
        </Link>
      </View>

      <ImageBackground source={{ uri: heroRecipe.imageUrl }} imageStyle={styles.heroImage} style={styles.hero}>
        <View style={styles.heroScrim}>
          <Sparkles color={colors.paper} size={20} />
          <Text variant="heading" style={styles.heroTitle}>
            AI import is ready for pasted captions and recipe notes.
          </Text>
          <Link href="/ai-import" asChild>
            <Button>Clean up a recipe</Button>
          </Link>
        </View>
      </ImageBackground>

      <View style={styles.statGrid}>
        {[
          ["128", "Saved recipes"],
          ["18", "Favorites"],
          ["7", "Planned meals"],
          ["34", "Grocery items"],
        ].map(([value, label]) => (
          <View key={label} style={styles.statCard}>
            <Text variant="heading">{value}</Text>
            <Text variant="caption">{label}</Text>
          </View>
        ))}
      </View>

      <Text variant="heading">Continue cooking</Text>
      <Link href={`/recipe/${heroRecipe.id}`} asChild>
        <RecipeCard recipe={heroRecipe} />
      </Link>

      <Text variant="heading">Recent recipes</Text>
      {sampleRecipes.slice(1).map((recipe) => (
        <Link key={recipe.id} href={`/recipe/${recipe.id}`} asChild>
          <RecipeCard recipe={recipe} />
        </Link>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.lg,
    justifyContent: "space-between",
  },
  avatar: {
    alignItems: "center",
    backgroundColor: colors.ink,
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  avatarText: {
    color: colors.paper,
    fontWeight: "900",
  },
  hero: {
    borderRadius: radii.xl,
    minHeight: 220,
    overflow: "hidden",
  },
  heroImage: {
    borderRadius: radii.xl,
  },
  heroScrim: {
    backgroundColor: "rgba(36,31,28,0.48)",
    flex: 1,
    gap: spacing.md,
    justifyContent: "flex-end",
    padding: spacing.lg,
  },
  heroTitle: {
    color: colors.paper,
  },
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  statCard: {
    backgroundColor: colors.paper,
    borderRadius: radii.lg,
    flexGrow: 1,
    minWidth: "45%",
    padding: spacing.lg,
  },
});
