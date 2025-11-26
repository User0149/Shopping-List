export type prefixType = "m" | "c" | "d" | "" | "k";
export type itemType = {
    selected: boolean, itemName: string, store: string, 
    unit: string, 
    storePrefix: string, storePrice: number, storeQuantity: number,  compPrefix: string, compQuantity: number
};
export type setState<T> = React.Dispatch<React.SetStateAction<T>>;