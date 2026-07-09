import { Recipe } from "@/types/recipe";
import type { CreateRecipeInput } from "./recipeRepository";

const fallbackImageUrl = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd";

export function searchRecipes(recipes: Recipe[], query = "") {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return recipes;

  return recipes.filter((recipe) => {
    const haystack = [
      recipe.title,
      recipe.description,
      recipe.cuisine,
      recipe.author,
      recipe.source,
      ...recipe.tags,
      ...recipe.ingredients.map((ingredient) => ingredient.name),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
}

export function buildLocalRecipeDraft(input: CreateRecipeInput): Recipe {
  const now = new Date().toISOString();
  const slug = input.title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return {
    id: `${slug || "recipe"}-${Date.now()}`,
    title: input.title.trim(),
    description: input.description.trim(),
    imageUrl: fallbackImageUrl,
    prepMinutes: 0,
    cookMinutes: 0,
    servings: 4,
    difficulty: "easy",
    cuisine: "Uncategorized",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    tags: ["Draft"],
    favorite: false,
    source: "Manual entry",
    author: "You",
    ingredients: input.ingredients
      .map((ingredient, index) => ({ id: `ingredient-${index + 1}`, amount: "", name: ingredient.name.trim() }))
      .filter((ingredient) => ingredient.name.length > 0),
    instructions: input.instructions
      .map((instruction, index) => ({ id: `instruction-${index + 1}`, body: instruction.body.trim() }))
      .filter((instruction) => instruction.body.length > 0),
    notes: "",
    dateAdded: now,
    lastEdited: now,
  };
}
