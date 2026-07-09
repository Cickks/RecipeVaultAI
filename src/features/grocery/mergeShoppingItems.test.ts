import { describe, expect, it } from "vitest";
import { mergeShoppingItems } from "./mergeShoppingItems";

describe("mergeShoppingItems", () => {
  it("combines duplicate grocery items case-insensitively", () => {
    const result = mergeShoppingItems([
      { name: "Tahini", amount: "1/4 cup" },
      { name: "tahini", amount: "2 tbsp" },
      { name: "Strawberries", amount: "1 pint" },
    ]);

    expect(result).toEqual([
      { name: "Strawberries", amount: "1 pint", category: undefined, count: 1 },
      { name: "Tahini", amount: "1/4 cup + 2 tbsp", category: undefined, count: 2 },
    ]);
  });
});
