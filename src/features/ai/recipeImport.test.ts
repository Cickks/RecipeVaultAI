import { describe, expect, it } from "vitest";
import { aiRecipeDraftSchema, buildRecipeImportPrompt } from "./recipeImport";

describe("aiRecipeDraftSchema", () => {
  it("accepts a structured editable recipe draft", () => {
    const result = aiRecipeDraftSchema.safeParse({
      title: "Lemon Chicken",
      ingredients: ["1 lb chicken", "1 lemon"],
      instructions: ["Season chicken", "Bake until done"],
      servings: 4,
      difficulty: "easy",
    });

    expect(result.success).toBe(true);
  });

  it("rejects empty ingredients", () => {
    const result = aiRecipeDraftSchema.safeParse({
      title: "Incomplete",
      ingredients: [],
      instructions: ["Cook"],
    });

    expect(result.success).toBe(false);
  });
});

describe("buildRecipeImportPrompt", () => {
  it("reminds the AI path not to scrape or download platform content", () => {
    const prompt = buildRecipeImportPrompt("caption text");

    expect(prompt.content).toContain("Do not claim to download or scrape platform content");
  });
});
