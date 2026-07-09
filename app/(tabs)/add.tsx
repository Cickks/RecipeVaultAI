import { Controller, useFieldArray, useForm } from "react-hook-form";
import { StyleSheet, TextInput, View } from "react-native";
import { Button } from "@/components/Button";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { colors, radii, spacing } from "@/theme/tokens";

type FormValues = {
  title: string;
  description: string;
  ingredients: { name: string }[];
  instructions: { body: string }[];
};

export default function AddRecipeScreen() {
  const { control } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      ingredients: [{ name: "" }],
      instructions: [{ body: "" }],
    },
  });
  const ingredients = useFieldArray({ control, name: "ingredients" });
  const instructions = useFieldArray({ control, name: "instructions" });

  return (
    <Screen>
      <Text variant="title">Add Recipe</Text>
      <Text variant="caption">Manual creation first. AI import, OCR, and link parsing stay editable and reviewable.</Text>
      <Controller control={control} name="title" render={({ field }) => <TextInput {...field} placeholder="Recipe title" style={styles.input} />} />
      <Controller
        control={control}
        name="description"
        render={({ field }) => <TextInput {...field} placeholder="Short description" multiline style={[styles.input, styles.multiline]} />}
      />
      <Text variant="heading">Ingredients</Text>
      {ingredients.fields.map((field, index) => (
        <Controller
          key={field.id}
          control={control}
          name={`ingredients.${index}.name`}
          render={({ field: input }) => <TextInput {...input} placeholder={`Ingredient ${index + 1}`} style={styles.input} />}
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
          render={({ field: input }) => <TextInput {...input} placeholder={`Step ${index + 1}`} multiline style={[styles.input, styles.multiline]} />}
        />
      ))}
      <View style={{ gap: spacing.md }}>
        <Button tone="secondary" onPress={() => instructions.append({ body: "" })}>
          Add step
        </Button>
        <Button>Save draft</Button>
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
});
