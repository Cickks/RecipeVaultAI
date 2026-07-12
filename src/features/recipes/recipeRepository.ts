import { sampleRecipes } from "@/data/sampleRecipes";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { Recipe } from "@/types/recipe";
import { buildLocalRecipeDraft, searchRecipes } from "./recipeUtils";

export type CreateRecipeInput = {
  description: string;
  ingredients: { name: string }[];
  instructions: { body: string }[];
  title: string;
};

let localRecipes = [...sampleRecipes];

type RecipeRow = {
  id: string;
  title: string;
  description: string | null;
  prep_minutes: number | null;
  cook_minutes: number | null;
  servings: number | null;
  difficulty: Recipe["difficulty"] | null;
  cuisine: string | null;
  calories: number | null;
  protein_grams: number | null;
  carbs_grams: number | null;
  fat_grams: number | null;
  notes: string | null;
  is_favorite: boolean;
  source_name: string | null;
  source_author: string | null;
  created_at: string;
  updated_at: string;
};

type IngredientRow = {
  id: string;
  amount: string | null;
  name: string;
};

type InstructionRow = {
  id: string;
  body: string;
  timer_minutes: number | null;
};

function mapRecipe(row: RecipeRow, ingredients: IngredientRow[] = [], instructions: InstructionRow[] = []): Recipe {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    prepMinutes: row.prep_minutes ?? 0,
    cookMinutes: row.cook_minutes ?? 0,
    servings: row.servings ?? 1,
    difficulty: row.difficulty ?? "easy",
    cuisine: row.cuisine ?? "Uncategorized",
    calories: row.calories ?? 0,
    protein: Number(row.protein_grams ?? 0),
    carbs: Number(row.carbs_grams ?? 0),
    fat: Number(row.fat_grams ?? 0),
    tags: [],
    favorite: row.is_favorite,
    source: row.source_name ?? "Manual entry",
    author: row.source_author ?? "You",
    ingredients: ingredients.map((ingredient) => ({
      id: ingredient.id,
      amount: ingredient.amount ?? "",
      name: ingredient.name,
    })),
    instructions: instructions.map((instruction) => ({
      id: instruction.id,
      body: instruction.body,
      timerMinutes: instruction.timer_minutes ?? undefined,
    })),
    notes: row.notes ?? "",
    dateAdded: row.created_at,
    lastEdited: row.updated_at,
  };
}

async function getSupabaseUserId() {
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) return null;

  return data.user?.id ?? null;
}

export const recipeRepository = {
  async create(input: CreateRecipeInput) {
    const userId = await getSupabaseUserId();
    if (!isSupabaseConfigured) {
      const draft = buildLocalRecipeDraft(input);
      localRecipes = [draft, ...localRecipes];
      return draft;
    }

    if (!supabase || !userId) {
      throw new Error("Sign in before saving recipes.");
    }

    const draft = buildLocalRecipeDraft(input);
    const { data: recipe, error } = await supabase
      .from("recipes")
      .insert({
        user_id: userId,
        title: draft.title,
        description: draft.description,
        servings: draft.servings,
        difficulty: draft.difficulty,
        cuisine: draft.cuisine,
        is_favorite: draft.favorite,
        source_name: draft.source,
        source_author: draft.author,
      })
      .select()
      .single<RecipeRow>();

    if (error) throw new Error("Could not save recipe.");

    const ingredientRows = draft.ingredients.map((ingredient, index) => ({
      recipe_id: recipe.id,
      user_id: userId,
      position: index,
      amount: ingredient.amount,
      name: ingredient.name,
    }));
    const instructionRows = draft.instructions.map((instruction, index) => ({
      recipe_id: recipe.id,
      user_id: userId,
      position: index,
      body: instruction.body,
      timer_minutes: instruction.timerMinutes,
    }));

    if (ingredientRows.length > 0) {
      const { error: ingredientError } = await supabase.from("recipe_ingredients").insert(ingredientRows);
      if (ingredientError) throw new Error("Recipe saved, but ingredients could not be saved.");
    }

    if (instructionRows.length > 0) {
      const { error: instructionError } = await supabase.from("recipe_instructions").insert(instructionRows);
      if (instructionError) throw new Error("Recipe saved, but instructions could not be saved.");
    }

    const created = await this.getById(recipe.id);
    if (!created) throw new Error("Recipe saved, but could not be reloaded.");

    return created;
  },
  async getById(id: string) {
    const userId = await getSupabaseUserId();
    if (!isSupabaseConfigured) {
      return localRecipes.find((recipe) => recipe.id === id) ?? null;
    }

    if (!supabase || !userId) {
      return null;
    }

    const { data: recipe, error } = await supabase.from("recipes").select("*").eq("id", id).single<RecipeRow>();
    if (error || !recipe) return null;

    const [{ data: ingredients }, { data: instructions }] = await Promise.all([
      supabase.from("recipe_ingredients").select("id, amount, name").eq("recipe_id", id).order("position"),
      supabase.from("recipe_instructions").select("id, body, timer_minutes").eq("recipe_id", id).order("position"),
    ]);

    return mapRecipe(recipe, ingredients ?? [], instructions ?? []);
  },
  async list(query = "") {
    const userId = await getSupabaseUserId();
    if (!isSupabaseConfigured) {
      return searchRecipes(localRecipes, query);
    }

    if (!supabase || !userId) {
      return [];
    }

    const { data, error } = await supabase.from("recipes").select("*").order("updated_at", { ascending: false });
    if (error) throw new Error("Could not load recipes.");

    return searchRecipes((data ?? []).map((row) => mapRecipe(row as RecipeRow)), query);
  },
};
