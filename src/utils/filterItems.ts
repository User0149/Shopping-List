import type { itemType } from "../types/types";

export function filterItems(items: Array<itemType>, searchQuery: string, selectedOnly: boolean) {
    return (
        items.filter((item) => {
            return item.itemName.toLowerCase().includes(searchQuery.toLowerCase());
        })
        .filter((item: itemType) => {
            return !selectedOnly || item.selected;
        })
    );
}