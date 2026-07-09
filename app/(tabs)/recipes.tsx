import { Link } from "expo-router";
import { RecipeCard } from "@/components/RecipeCard";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { useRecipes } from "@/features/recipes/useRecipes";

export default function RecipesScreen() {
  const recipes = useRecipes();

  return (
    <Screen>
      <Text variant="title">Recipe Vault</Text>
      <Text variant="caption">All recipes, favorites, family notes, and social finds live here.</Text>
      {recipes.map((recipe) => (
        <Link key={recipe.id} href={`/recipe/${recipe.id}`} asChild>
          <RecipeCard recipe={recipe} />
        </Link>
      ))}
    </Screen>
  );
}
