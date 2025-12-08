import type { Item } from "../types/types";

export function filterItems(items: Array<Item>, searchQuery: string, selectedOnly: boolean) {
    return (
        items.filter((item) => {
            return item.itemName.toLowerCase().includes(searchQuery.toLowerCase());
        })
        .filter((item: Item) => {
            return !selectedOnly || item.selected;
        })
    );
}
