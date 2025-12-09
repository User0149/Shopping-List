import { createContext, useContext, useState, type ReactNode } from "react";
import type { Item } from "../types/types";
import { ModalsContext } from "./ModalsContext";

interface IUpdateItemContext {
    selectedItem: Item | null;

    showEditItemBox: boolean;
    showCompareItemBox: boolean;
    
    addItem: () => void;
    compareItem: (item: Item) => void;
    editItem: (item: Item) => void;
}

interface UpdateItemContextProviderProps {
    children: ReactNode;
}

export const UpdateItemContext = createContext<IUpdateItemContext>({
    selectedItem: null,

    showEditItemBox: false,
    showCompareItemBox: false,

    addItem: () => {},
    compareItem: () => {},
    editItem: () => {}
});

export default function UpdateItemContextProvider({ children }: UpdateItemContextProviderProps) {
    const { setShowAddItemBox, setShowCompareAndEditBox } = useContext(ModalsContext);

    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const [showCompareItemBox, setShowCompareItemBox] = useState<boolean>(true);
    const [showEditItemBox, setShowEditItemBox] = useState<boolean>(false);

    const addItem = () => {
        setShowAddItemBox(true);
    }

    const compareItem = (item: Item) => {
        setSelectedItem(item);
        setShowCompareItemBox(true);
        setShowEditItemBox(false);

        setShowCompareAndEditBox(true);
    }

    const editItem = (item: Item) => {
        setSelectedItem(item);
        setShowCompareItemBox(false);
        setShowEditItemBox(true);

        setShowCompareAndEditBox(true);
    }

    const initialUpdateItemContext: IUpdateItemContext = {
        selectedItem,

        showEditItemBox,
        showCompareItemBox,

        addItem,
        compareItem,
        editItem
    };

    return (
        <UpdateItemContext value={initialUpdateItemContext}>
            {children}
        </UpdateItemContext>
    );
}
