import { describe, expect, it } from "vitest";
import { sampleRecipes } from "@/data/sampleRecipes";
import { buildLocalRecipeDraft, searchRecipes } from "./recipeUtils";

describe("recipe repository helpers", () => {
  it("searches recipes by title, tag, and ingredient", () => {
    expect(searchRecipes(sampleRecipes, "farro")).toHaveLength(1);
    expect(searchRecipes(sampleRecipes, "high protein")).toHaveLength(1);
    expect(searchRecipes(sampleRecipes, "tomato sugo")[0]?.id).toBe("sunday-sugo");
  });

  it("builds a clean local recipe draft from form values", () => {
    const recipe = buildLocalRecipeDraft({
      title: "  Test Soup  ",
      description: "  Cozy bowl  ",
      ingredients: [{ name: " stock " }, { name: "" }],
      instructions: [{ body: " simmer " }, { body: " " }],
    });

    expect(recipe.title).toBe("Test Soup");
    expect(recipe.description).toBe("Cozy bowl");
    expect(recipe.ingredients).toEqual([{ id: "ingredient-1", amount: "", name: "stock" }]);
    expect(recipe.instructions).toEqual([{ id: "instruction-1", body: "simmer" }]);
  });
});
