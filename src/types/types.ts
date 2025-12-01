export type setState<T> = React.Dispatch<React.SetStateAction<T>>;

export type prefixType = "m" | "c" | "d" | "" | "k";

export type itemType = {
    selected: boolean;
    itemName: string;
    unit: string;

    store: string;
    storePrefix: string;
    storePrice: number;
    storeQuantity: number;
    
    compPrefix: string;
    compQuantity: number;
};

export interface IItemsContext {
    items: Array<itemType> | null;
    setItemsAndUpdateLocalStorage: (itemsArray: Array<itemType>) => void;
}

export interface ISearchContext {
    searchQuery: string;
    setSearchQuery: setState<string>;
}

export interface IUpdateItemContext {
    selectedItem: itemType | null;

    showAddItemBox: boolean;
    showCompareAndEditBox: boolean;
    showEditItemBox: boolean;
    showCompareItemBox: boolean;
    
    addItem: () => void;
    compareItem: (item: itemType) => void;
    editItem: (item: itemType) => void;
    hideModals: () => void;
}