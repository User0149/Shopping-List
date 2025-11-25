import type { prefixType } from "./types.ts";

export function pricePerQty(price: number, quantity: number, prefix: string, compQuantity: number, compPrefix: string): string {
    const multipliers = {"m": 0.001, "c": 0.01, "d": 0.1, "": 1, "k": 1000}; 
    const base_ppq: number = price / (quantity * (multipliers[prefix as prefixType] ?? NaN)); // price per unit quantity

    const wanted_quantity = compQuantity * (multipliers[compPrefix as prefixType] ?? NaN);

    return String(base_ppq * wanted_quantity);
}