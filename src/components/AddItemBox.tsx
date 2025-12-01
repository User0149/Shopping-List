import { useContext, useEffect, useState } from "react";
import type { itemType, setState } from "../types/types";
import { pricePerQty } from "../utils/pricePerQty";
import ModalBox from "./ModalBox";
import { UpdateItemContext } from "../context/UpdateItemContext";
import { ItemsContext } from "../context/ItemsContext";

const submitAddItemForm = (e: React.FormEvent<HTMLFormElement>, setInvalidItem: setState<boolean>, items: Array<itemType>, setItemsAndUpdateLocalStorage: (itemsArray: Array<itemType>) => void, hideModals: () => void) => {    
    e.preventDefault();
    const form: HTMLFormElement = e.target as HTMLFormElement;
    const formData = Object.fromEntries(new FormData(form).entries());
    
    const newItem: itemType = {
        itemName: formData["item-name"] as string,
        selected: formData["selected"] ? true : false,
        store: formData["store"] as string,
        unit: formData["unit"] as string,
        storePrefix: formData["store-prefix"] as string,
        storePrice: Number(formData["store-price"]),
        storeQuantity: Number(formData["store-quantity"]),
        compPrefix: formData["comp-prefix"] as string,
        compQuantity: Number(formData["comp-quantity"])
    };
    
    if (items === null) {
        console.log("Error: `items` is null");
        return;
    }

    const invalidNewItem = items.some((item) => (item.itemName === newItem.itemName));
    if (!invalidNewItem) {
        const newItems = [...items];
        newItems.push(newItem);
        newItems.sort((a, b) =>  Number(a.itemName.localeCompare(b.itemName)));

        setItemsAndUpdateLocalStorage(newItems);
        hideModals();
    }
    else {
        setInvalidItem(true);
    }
};

export default function AddItemBox() {
    const { items, setItemsAndUpdateLocalStorage } = useContext(ItemsContext);
    const { showAddItemBox, hideModals } = useContext(UpdateItemContext);

    const [unit, setUnit] = useState<string>("g");
    const [storePrice, setStorePrice] = useState<string>("5");
    const [storeQuantity, setStoreQuantity] = useState<string>("1");
    const [storePrefix, setStorePrefix] = useState<string>("k");
    const [compQuantity, setCompQuantity] = useState<string>("100");
    const [compPrefix, setCompPrefix] = useState<string>("");

    const [invalidItem, setInvalidItem] = useState<boolean>(false);

    const resetState = () => {
        setUnit("g");
        setStorePrice("5");
        setStoreQuantity("1");
        setStorePrefix("k");
        setCompQuantity("100");
        setCompPrefix("");

        setInvalidItem(false);
    };

    useEffect(() => {
        if (!showAddItemBox) {
            resetState();
        }
    }, [showAddItemBox]);

    if (!showAddItemBox || items === null) return <></>;

    return (
        <ModalBox>
            <h2>Add an item</h2>
            <form onSubmit={(e) => submitAddItemForm(e, setInvalidItem, items, setItemsAndUpdateLocalStorage, hideModals)}>
                <div className="mb-1 text-lg font-bold">
                    <label htmlFor="add-item-name">Item name:&nbsp;</label>
                    <input id="add-item-name" type="text" name="item-name" className="border rounded" required></input>
                </div>

                {
                    invalidItem && (<div className="text-[red] text-sm">
                        There is an item with the same name.
                    </div>)
                }

                <div className="mb-1">
                    <label htmlFor="add-selected">Selected&nbsp;</label>
                    <input id="add-selected" type="checkbox" name="selected"></input>
                </div>
                <div className="mb-1">
                    <label htmlFor="add-unit">Base unit:&nbsp;</label>
                    <input id="add-unit" type="text" name="unit" className="border rounded w-10" value={unit} onInput={() => {setUnit((document.getElementById("add-unit") as HTMLInputElement)?.value)}}></input>
                </div>

                <br></br>

                <div className="mb-1 text-lg">
                    <label htmlFor="add-store">Store:&nbsp;</label>
                    <input id="add-store" type="text" name="store" className="border rounded"></input>
                </div>
                <div>Price/quantity at store:&nbsp;</div>
                <div className="mb-1">
                    $
                    <input id="add-store-price" type="text" name="store-price" className="border rounded w-12" value={storePrice} onInput={() => {setStorePrice((document.getElementById("add-store-price") as HTMLInputElement)?.value)}}></input>
                    &nbsp;@&nbsp;
                    <input id="add-store-quantity" type="text" name="store-quantity" className="border rounded w-10" value={storeQuantity} onInput={() => {setStoreQuantity((document.getElementById("add-store-quantity") as HTMLInputElement)?.value)}}></input>
                    &nbsp;
                    <input id="add-store-prefix" type="text" name="store-prefix" className="border rounded w-10 text-right" value={storePrefix} onInput={() => {setStorePrefix((document.getElementById("add-store-prefix") as HTMLInputElement)?.value)}}></input>
                    {unit}
                </div>

                <br></br>
                <div className="mb-1">
                    <div>Value comparison</div>
                    <div>
                        $
                        <span>{pricePerQty(Number(storePrice), Number(storeQuantity), storePrefix, Number(compQuantity), compPrefix)}</span>
                        &nbsp;/&nbsp;
                        <input id="add-comp-quantity" type="text" name="comp-quantity" className="border rounded w-10" value={compQuantity} onInput={() => {setCompQuantity((document.getElementById("add-comp-quantity") as HTMLInputElement)?.value)}}></input>
                        &nbsp;
                        <input id="add-comp-prefix" type="text" name="comp-prefix" className="border rounded w-10 text-right" value={compPrefix} onInput={() => {setCompPrefix((document.getElementById("add-comp-prefix") as HTMLInputElement)?.value)}}></input>
                        {unit}
                    </div>
                </div>

                <br></br>

                <input type="submit" className="border rounded p-2 cursor-pointer bg-[#eeeeee] hover:bg-[lightgray]" value="Add item"></input>
            </form>
        </ModalBox>
    );
}