import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import type { Item } from "../types/types";

import { SettingsContext } from "./SettingsContext";

interface IItemsContext {
    items: Array<Item>;
    setItemsAndUpdateLocalStorage: (itemsArray: Array<Item>) => void;
}

interface ItemsContextProviderProps {
    children: ReactNode;
}

export const ItemsContext = createContext<IItemsContext>({
    items: [],
    setItemsAndUpdateLocalStorage: () => {}
});

export default function ItemsContextProvider({ children }: ItemsContextProviderProps) {
    const { itemsCookie, setItemsCookieAndUpdateLocalStorage } = useContext(SettingsContext);

    const [items, setItems] = useState<Array<Item>>(JSON.parse(itemsCookie));

    useEffect(() => {
        setItems(JSON.parse(itemsCookie));
    }, [itemsCookie]);

    const setItemsAndUpdateLocalStorage = (itemsArray: Array<Item>) => {
        setItems(itemsArray);
        setItemsCookieAndUpdateLocalStorage(JSON.stringify(itemsArray));
    };

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
