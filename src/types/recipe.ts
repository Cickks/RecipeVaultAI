export type Difficulty = "easy" | "medium" | "hard";

export type Ingredient = {
  id: string;
  amount: string;
  name: string;
};

export type Instruction = {
  id: string;
  body: string;
  timerMinutes?: number;
};

export type Recipe = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  difficulty: Difficulty;
  cuisine: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tags: string[];
  favorite: boolean;
  source: string;
  author: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  notes: string;
  dateAdded: string;
  lastEdited: string;
};
