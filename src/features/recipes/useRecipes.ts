import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateRecipeInput, recipeRepository } from "./recipeRepository";

export function useRecipes(query = "") {
  const result = useQuery({
    queryKey: ["recipes", query],
    queryFn: () => recipeRepository.list(query),
  });

  return result.data ?? [];
}

export function useRecipe(id?: string) {
  return useQuery({
    enabled: Boolean(id),
    queryKey: ["recipe", id],
    queryFn: () => recipeRepository.getById(id ?? ""),
  });
}

export function useCreateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateRecipeInput) => recipeRepository.create(input),
    onSuccess: async (recipe) => {
      await queryClient.invalidateQueries({ queryKey: ["recipes"] });
      if (recipe) {
        queryClient.setQueryData(["recipe", recipe.id], recipe);
      }
    },
  });
}
