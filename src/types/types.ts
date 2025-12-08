export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type Prefix = "m" | "c" | "d" | "" | "k";

export type Item = {
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
    items: Array<Item> | null;
    setItemsAndUpdateLocalStorage: (itemsArray: Array<Item>) => void;
}

export interface ISearchContext {
    searchQuery: string;
    setSearchQuery: StateSetter<string>;
}

export interface IUpdateItemContext {
    selectedItem: Item | null;

    showAddItemBox: boolean;
    showCompareAndEditBox: boolean;
    showEditItemBox: boolean;
    showCompareItemBox: boolean;
    
    addItem: () => void;
    compareItem: (item: Item) => void;
    editItem: (item: Item) => void;
    hideModals: () => void;
}
