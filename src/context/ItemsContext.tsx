import { createContext, useState, type ReactNode } from "react";
import type { IItemsContext, Item } from "../types/types";

export const ItemsContext = createContext<IItemsContext>({
    items: null,
    setItemsAndUpdateLocalStorage: () => {}
});

interface ItemsContextProviderProps {
    children: ReactNode;
}

export default function ItemsContextProvider({ children }: ItemsContextProviderProps) {
    const [items, setItems] = useState<Array<Item> | null>(localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items") as string) : null);

    const setItemsAndUpdateLocalStorage = (itemsArray: Array<Item>) => {
        localStorage.setItem("items", JSON.stringify(itemsArray));
        setItems(itemsArray);
    };
    if (items === null) {
        setItemsAndUpdateLocalStorage([]);
    }

    const initialItemsContext: IItemsContext = {
        items,
        setItemsAndUpdateLocalStorage
    };

    return (
        <ItemsContext value={initialItemsContext}>
            {children}
        </ItemsContext>
    );
}
