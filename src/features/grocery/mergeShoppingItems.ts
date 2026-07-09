export type ShoppingInput = {
  name: string;
  amount?: string;
  category?: string;
};

export type MergedShoppingItem = ShoppingInput & {
  count: number;
};

export function mergeShoppingItems(items: ShoppingInput[]): MergedShoppingItem[] {
  const map = new Map<string, MergedShoppingItem>();

  for (const item of items) {
    const normalized = item.name.trim().toLowerCase();
    if (!normalized) continue;

    const existing = map.get(normalized);
    if (existing) {
      map.set(normalized, {
        ...existing,
        amount: [existing.amount, item.amount].filter(Boolean).join(" + "),
        count: existing.count + 1,
      });
      continue;
    }

    map.set(normalized, {
      name: item.name.trim(),
      amount: item.amount,
      category: item.category,
      count: 1,
    });
  }

  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}
