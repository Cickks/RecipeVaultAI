import { Controller, useFieldArray, useForm } from "react-hook-form";
import { StyleSheet, TextInput, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { Button } from "@/components/Button";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { useAuthStore } from "@/features/auth/useAuthStore";
import { useCreateRecipe } from "@/features/recipes/useRecipes";
import { isSupabaseConfigured } from "@/lib/supabase";
import { colors, radii, spacing } from "@/theme/tokens";

type FormValues = {
  title: string;
  description: string;
  ingredients: { name: string }[];
  instructions: { body: string }[];
};

export default function AddRecipeScreen() {
  const router = useRouter();
  const createRecipe = useCreateRecipe();
  const authMode = useAuthStore((state) => state.mode);
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      ingredients: [{ name: "" }],
      instructions: [{ body: "" }],
    },
  });
  const ingredients = useFieldArray({ control, name: "ingredients" });
  const instructions = useFieldArray({ control, name: "instructions" });

  async function saveDraft(values: FormValues) {
    const recipe = await createRecipe.mutateAsync(values);
    reset();
    router.push(`/recipe/${recipe.id}`);
  }

  if (isSupabaseConfigured && authMode !== "signed-in") {
    return (
      <Screen>
        <Text variant="title">Sign in to save recipes</Text>
        <Text variant="caption">RecipeVault AI stores production recipes under your Supabase account with RLS-protected ownership.</Text>
        <Link href="/auth" asChild>
          <Button>Sign in or create account</Button>
        </Link>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text variant="title">Add Recipe</Text>
      <Text variant="caption">Manual creation first. AI import, OCR, and link parsing stay editable and reviewable.</Text>
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <TextInput accessibilityLabel="Recipe title" onBlur={field.onBlur} onChangeText={field.onChange} placeholder="Recipe title" style={styles.input} value={field.value} />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <TextInput
            accessibilityLabel="Recipe description"
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            placeholder="Short description"
            multiline
            style={[styles.input, styles.multiline]}
            value={field.value}
          />
        )}
      />
      <Text variant="heading">Ingredients</Text>
      {ingredients.fields.map((field, index) => (
        <Controller
          key={field.id}
          control={control}
          name={`ingredients.${index}.name`}
          render={({ field: input }) => (
            <TextInput
              accessibilityLabel={`Ingredient ${index + 1}`}
              onBlur={input.onBlur}
              onChangeText={input.onChange}
              placeholder={`Ingredient ${index + 1}`}
              style={styles.input}
              value={input.value}
            />
          )}
        />
      ))}
      <Button tone="secondary" onPress={() => ingredients.append({ name: "" })}>
        Add ingredient
      </Button>
      <Text variant="heading">Directions</Text>
      {instructions.fields.map((field, index) => (
        <Controller
          key={field.id}
          control={control}
          name={`instructions.${index}.body`}
          render={({ field: input }) => (
            <TextInput
              accessibilityLabel={`Direction step ${index + 1}`}
              onBlur={input.onBlur}
              onChangeText={input.onChange}
              placeholder={`Step ${index + 1}`}
              multiline
              style={[styles.input, styles.multiline]}
              value={input.value}
            />
          )}
        />
      ))}
      <View style={{ gap: spacing.md }}>
        <Button tone="secondary" onPress={() => instructions.append({ body: "" })}>
          Add step
        </Button>
        {createRecipe.error ? <Text style={styles.error}>Could not save this recipe draft.</Text> : null}
        <Button disabled={createRecipe.isPending} onPress={handleSubmit(saveDraft)}>
          {createRecipe.isPending ? "Saving..." : "Save draft"}
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.paper,
    borderRadius: radii.lg,
    color: colors.ink,
    fontSize: 16,
    minHeight: 54,
    padding: spacing.lg,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  error: {
    color: colors.tomato,
    fontWeight: "800",
  },
});
