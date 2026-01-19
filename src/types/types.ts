export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type Prefix = "m" | "c" | "d" | "" | "k";

export interface Item {
    selected: boolean;
    itemName: string;
    unit: string;

    store: string;
    storePrefix: string;
    storePrice: number;
    storeQuantity: number;
    
    compPrefix: string;
    compQuantity: number;
}
