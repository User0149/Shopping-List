import { createContext, useState, type ReactNode } from "react";
import type { itemType, IUpdateItemContext } from "../types/types";

export const UpdateItemContext = createContext<IUpdateItemContext>({
    selectedItem: null,

    showAddItemBox: false,
    showCompareAndEditBox: false,
    showEditItemBox: false,
    showCompareItemBox: false,

    addItem: () => {},
    compareItem: () => {},
    editItem: () => {},
    hideModals: () => {}
});

interface UpdateItemContextProviderProps {
    children: ReactNode;
}

export default function UpdateItemContextProvider({ children }: UpdateItemContextProviderProps) {
    const [showAddItemBox, setShowAddItemBox] = useState<boolean>(false);
    const [showCompareAndEditBox, setShowCompareAndEditBox] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<itemType | null>(null);

    const [showCompareItemBox, setShowCompareItemBox] = useState<boolean>(true);
    const [showEditItemBox, setShowEditItemBox] = useState<boolean>(false);

    const addItem = () => {
        setShowAddItemBox(true);
    }

    const compareItem = (item: itemType) => {
        setSelectedItem(item);
        setShowCompareItemBox(true);
        setShowEditItemBox(false);

        setShowCompareAndEditBox(true);
    }

    const editItem = (item: itemType) => {
        setSelectedItem(item);
        setShowCompareItemBox(false);
        setShowEditItemBox(true);

        setShowCompareAndEditBox(true);
    }

    const hideModals = () => {
        setShowAddItemBox(false);
        setShowCompareAndEditBox(false);
    }

    const initialUpdateItemContext: IUpdateItemContext = {
        selectedItem,

        showAddItemBox,
        showCompareAndEditBox,
        showEditItemBox,
        showCompareItemBox,

        addItem,
        compareItem,
        editItem,
        hideModals
    };

    return (
        <UpdateItemContext value={initialUpdateItemContext}>
            {children}
        </UpdateItemContext>
    );
}