import { Link } from "expo-router";
import { View } from "react-native";
import { Button } from "@/components/Button";
import { RecipeCard } from "@/components/RecipeCard";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAuthStore } from "@/features/auth/useAuthStore";
import { useRecipes } from "@/features/recipes/useRecipes";
import { isSupabaseConfigured } from "@/lib/supabase";
import { spacing } from "@/theme/tokens";

export default function RecipesScreen() {
  const authMode = useAuthStore((state) => state.mode);
  const recipes = useRecipes();
  const requiresSignIn = isSupabaseConfigured && authMode !== "signed-in";

  return (
    <Screen>
      <Text variant="title">Recipe Vault</Text>
      <Text variant="caption">All recipes, favorites, family notes, and social finds live here.</Text>
      {requiresSignIn ? (
        <View style={{ gap: spacing.md }}>
          <Text variant="heading">Your cloud cookbook is private</Text>
          <Text variant="caption">Sign in to load recipes from Supabase. RLS keeps each user&apos;s vault separate.</Text>
          <Link href="/auth" asChild>
            <Button>Sign in or create account</Button>
          </Link>
        </View>
      ) : null}
      {recipes.map((recipe) => (
        <Link key={recipe.id} href={`/recipe/${recipe.id}`} asChild>
          <RecipeCard recipe={recipe} />
        </Link>
      ))}
    </Screen>
  );
}
