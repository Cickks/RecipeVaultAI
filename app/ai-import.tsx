import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Button } from "@/components/Button";
import { Screen } from "@/components/Screen";
import { Text } from "@/components/Text";
import { buildRecipeImportPrompt } from "@/features/ai/recipeImport";
import { colors, radii, spacing } from "@/theme/tokens";

export default function AiImportScreen() {
  const [text, setText] = useState("");
  const [preview, setPreview] = useState("");

  return (
    <Screen>
      <Text variant="title">AI Recipe Import</Text>
      <Text variant="caption">Paste recipe text, captions, transcripts, or ingredient lists. RecipeVault AI does not download social videos or bypass platform terms.</Text>
      <TextInput
        accessibilityLabel="Recipe text to import"
        multiline
        placeholder="Paste a caption, transcript, family note, or recipe text..."
        placeholderTextColor={colors.cocoa}
        value={text}
        onChangeText={setText}
        style={styles.textArea}
      />
      <Button onPress={() => setPreview(buildRecipeImportPrompt(text || "No text pasted yet.").content)}>Create structured draft</Button>
      {preview ? (
        <View style={styles.preview}>
          <Text variant="heading">AI service request preview</Text>
          <Text variant="caption">{preview}</Text>
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  textArea: {
    backgroundColor: colors.paper,
    borderRadius: radii.xl,
    color: colors.ink,
    fontSize: 16,
    minHeight: 220,
    padding: spacing.lg,
    textAlignVertical: "top",
  },
  preview: {
    backgroundColor: colors.mist,
    borderRadius: radii.lg,
    gap: spacing.sm,
    padding: spacing.lg,
  },
});
