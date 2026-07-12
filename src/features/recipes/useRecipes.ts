import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/useAuthStore";
import { CreateRecipeInput, recipeRepository } from "./recipeRepository";

export function useRecipes(query = "") {
  const userId = useAuthStore((state) => state.user?.id ?? "local");
  const result = useQuery({
    queryKey: ["recipes", userId, query],
    queryFn: () => recipeRepository.list(query),
  });

  return result.data ?? [];
}

export function useRecipe(id?: string) {
  const userId = useAuthStore((state) => state.user?.id ?? "local");

  return useQuery({
    enabled: Boolean(id),
    queryKey: ["recipe", userId, id],
    queryFn: () => recipeRepository.getById(id ?? ""),
  });
}

export function useCreateRecipe() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.user?.id ?? "local");

  return useMutation({
    mutationFn: (input: CreateRecipeInput) => recipeRepository.create(input),
    onSuccess: async (recipe) => {
      await queryClient.invalidateQueries({ queryKey: ["recipes"] });
      if (recipe) {
        queryClient.setQueryData(["recipe", userId, recipe.id], recipe);
      }
    },
  });
}
