import { useMemo } from "react";
import { sampleRecipes } from "@/data/sampleRecipes";

export function useRecipes(query = "") {
  return useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return sampleRecipes;

    return sampleRecipes.filter((recipe) => {
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
  }, [query]);
}
