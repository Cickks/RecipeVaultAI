import { Link } from "expo-router";
import { RecipeCard } from "@/components/RecipeCard";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { sampleRecipes } from "@/data/sampleRecipes";

export default function RecipesScreen() {
  return (
    <Screen>
      <Text variant="title">Recipe Vault</Text>
      <Text variant="caption">All recipes, favorites, family notes, and social finds live here.</Text>
      {sampleRecipes.map((recipe) => (
        <Link key={recipe.id} href={`/recipe/${recipe.id}`} asChild>
          <RecipeCard recipe={recipe} />
        </Link>
      ))}
    </Screen>
  );
}
