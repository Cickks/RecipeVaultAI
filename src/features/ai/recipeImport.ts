import { z } from "zod";

export const aiRecipeDraftSchema = z.object({
  title: z.string().min(2),
  ingredients: z.array(z.string()).min(1),
  instructions: z.array(z.string()).min(1),
  prepMinutes: z.number().int().nonnegative().optional(),
  cookMinutes: z.number().int().nonnegative().optional(),
  servings: z.number().int().positive().optional(),
  cuisine: z.string().optional(),
  difficulty: z.enum(["easy", "medium", "hard"]).optional(),
  sourceCredit: z.string().optional(),
});

export type AiRecipeDraft = z.infer<typeof aiRecipeDraftSchema>;

export function buildRecipeImportPrompt(pastedText: string) {
  return {
    role: "user",
    content: `Convert this user-provided recipe text into structured JSON. Preserve source attribution when present. Do not claim to download or scrape platform content.\n\n${pastedText}`,
  };
}
