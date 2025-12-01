import { createContext, useState, type ReactNode } from "react";
import type { IItemsContext, itemType } from "../types/types";

export const ItemsContext = createContext<IItemsContext>({
    items: null,
    setItemsAndUpdateLocalStorage: () => {}
});

interface ItemsContextProviderProps {
    children: ReactNode;
}

export default function ItemsContextProvider({ children }: ItemsContextProviderProps) {
    const [items, setItems] = useState<Array<itemType> | null>(localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items") as string) : null);

    const setItemsAndUpdateLocalStorage = (itemsArray: Array<itemType>) => {
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