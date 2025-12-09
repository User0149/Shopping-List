import { useContext, useEffect, useState } from "react";

import type { Item, StateSetter } from "../types/types";

import { pricePerQty } from "../utils/pricePerQty";

import { ModalsContext } from "../context/ModalsContext";
import { ItemsContext } from "../context/ItemsContext";
import { UpdateItemContext } from "../context/UpdateItemContext";

import ModalBox from "./ModalBox";
import SpaceY from "./SpaceY";

interface EditItemBoxProps {
    showCompareAndEditBox: boolean;
}

function CompareItemBox() {
    const { selectedItem, showCompareItemBox } = useContext(UpdateItemContext);

    const [otherPrice, setOtherPrice] = useState<string>(selectedItem !== null ? String(selectedItem.storePrice) : "");
    const [otherQuantity, setOtherQuantity] = useState<string>(selectedItem !== null ? String(selectedItem.storeQuantity) : "");
    const [otherPrefix, setOtherPrefix] = useState<string>(selectedItem !== null ? selectedItem.storePrefix : "");
    
    if (selectedItem === null || !showCompareItemBox) return <></>;

    const storePricePerQty = Number(pricePerQty(selectedItem.storePrice, selectedItem.storeQuantity, selectedItem.storePrefix, selectedItem.compQuantity, selectedItem.compPrefix));
    const otherPricePerQty = Number(pricePerQty(Number(otherPrice), Number(otherQuantity), otherPrefix, selectedItem.compQuantity, selectedItem.compPrefix));

    return (
        <div className="text-2xl">
            <SpaceY spacing={5}>
                <div>
                    <div>
                        Price per quantity at {selectedItem.store}:
                    </div>
                    <div>
                        ${storePricePerQty} / {selectedItem.compQuantity}&nbsp;{selectedItem.compPrefix}{selectedItem.unit}
                    </div>
                </div>

                <div>
                    <div>Compare value</div>
                    <div>
                        $

                        <input type="text" className="border rounded w-20" value={otherPrice} onInput={(e) => {
                            setOtherPrice((e.target as HTMLInputElement).value);
                        }}></input>

                        &nbsp;@&nbsp;

                        <input type="text" className="border rounded w-20" value={otherQuantity} onInput={(e) => {
                            setOtherQuantity((e.target as HTMLInputElement).value);
                        }}></input>

                        &nbsp;

                        <input type="text" className="border rounded w-15 text-right" value={otherPrefix} onInput={(e) => {
                            setOtherPrefix((e.target as HTMLInputElement).value)
                        }}></input>

                        {selectedItem.unit}
                    </div>

                    <div className={otherPricePerQty < storePricePerQty ? "text-green-500" : (otherPricePerQty > storePricePerQty ? "text-red-500" : "text-yellow-500")}>
                        = ${otherPricePerQty.toFixed(2)} / {selectedItem.compQuantity}&nbsp;{selectedItem.compPrefix}{selectedItem.unit}
                    </div>
                </div>
            </SpaceY>
        </div>
    );
}

const submitEditItemForm = (e: React.FormEvent<HTMLFormElement>, setInvalidItem: StateSetter<boolean>, items: Array<Item>, setItemsAndUpdateLocalStorage: (itemsArray: Array<Item>) => void, selectedItem: Item, hideModals: () => void) => {
    e.preventDefault();
    const form: HTMLFormElement = e.target as HTMLFormElement;
    const formData = Object.fromEntries(new FormData(form as HTMLFormElement).entries());
    
    const newItem: Item = {
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
    
    const invalidNewItem = (newItem.itemName !== selectedItem.itemName) && items.some((item) => {
        return item.itemName === newItem.itemName;
    });    
    if (!invalidNewItem) {
        const newItems = items.filter((item) => (item.itemName !== selectedItem.itemName));
        newItems.push(newItem);
        newItems.sort((a, b) =>  Number(a.itemName.localeCompare(b.itemName)));

        setItemsAndUpdateLocalStorage(newItems);
        hideModals();
    }
    else {
        setInvalidItem(true);
    }
};

function EditItemBox({ showCompareAndEditBox }: EditItemBoxProps) {
    const { items, setItemsAndUpdateLocalStorage } = useContext(ItemsContext);
    const { selectedItem, showEditItemBox } = useContext(UpdateItemContext);
    const { hideModals } = useContext(ModalsContext);

    const [itemName, setItemName] = useState<string>(selectedItem !== null ? selectedItem.itemName : "");
    const [selected, setSelected] = useState<boolean>(selectedItem !== null ? selectedItem.selected : false);
    const [unit, setUnit] = useState<string>(selectedItem !== null ? selectedItem.unit : "");

    const [store, setStore] = useState<string>(selectedItem !== null ? selectedItem.store : "");
    const [storePrice, setStorePrice] = useState<string>(selectedItem !== null ? String(selectedItem.storePrice) : "");
    const [storeQuantity, setStoreQuantity] = useState<string>(selectedItem !== null ? String(selectedItem.storeQuantity) : "");
    const [storePrefix, setStorePrefix] = useState<string>(selectedItem !== null ? selectedItem.storePrefix : "");

    const [compQuantity, setCompQuantity] = useState<string>(selectedItem !== null ? String(selectedItem.compQuantity) : "");
    const [compPrefix, setCompPrefix] = useState<string>(selectedItem !== null ? selectedItem.compPrefix : "");

    const [invalidItem, setInvalidItem] = useState<boolean>(false);

    const resetState = () => {
        setItemName(selectedItem !== null ? selectedItem.itemName : "");
        setSelected(selectedItem !== null ? selectedItem.selected : false);
        setUnit(selectedItem !== null ? selectedItem.unit : "");

        setStore(selectedItem !== null ? selectedItem.store : "");
        setStorePrice(selectedItem !== null ? selectedItem.store : "");
        setStoreQuantity(selectedItem !== null ? String(selectedItem.storeQuantity) : "");
        setStorePrefix(selectedItem !== null ? selectedItem.storePrefix : "");

        setCompQuantity(selectedItem !== null ? String(selectedItem.compQuantity) : "");
        setCompPrefix(selectedItem !== null ? selectedItem.compPrefix : "");

        setInvalidItem(false);
    };

    useEffect(() => {
        if (!showCompareAndEditBox) {
            resetState();
        }
    }, [showCompareAndEditBox]);

    if (selectedItem === null || items === null || !showEditItemBox) return <></>;

    return (
        <form onSubmit={(e) => submitEditItemForm(e, setInvalidItem, items, setItemsAndUpdateLocalStorage, selectedItem, hideModals)}>
            <SpaceY spacing={6}>
                {/* Name */}
                <div>
                    <div className="text-lg font-bold">
                        <label htmlFor="edit-item-name">Item name:<span className="text-[red]">*</span>&nbsp;</label>
                        <input id="edit-item-name" type="text" name="item-name" className="border rounded"  value={itemName}  onInput={(e) => {setItemName((e.target as HTMLInputElement).value)}} required></input>
                    </div>
                    {
                        invalidItem && (<div className="text-[red] text-sm">
                            There is an item with the same name.
                        </div>)
                    }
                </div>

                {/* Item Properties */}
                <div>
                    <div>
                        <label htmlFor="edit-selected">Selected&nbsp;</label>
                        <input id="edit-selected" type="checkbox" name="selected" checked={selected} onChange={(e) => setSelected(e.target.checked)}></input>
                    </div>
                    <div>
                        <label htmlFor="edit-unit">Base unit:&nbsp;</label>
                        <input id="edit-unit" type="text" name="unit" className="border rounded w-10" value={unit} onInput={(e) => {setUnit((e.target as HTMLInputElement).value)}}></input>
                    </div>
                </div>

                {/* Store */}
                <SpaceY spacing={2}>
                    <div className="text-lg font-bold">
                        <label htmlFor="edit-store">Store:&nbsp;</label>
                        <input id="edit-store" type="text" name="store" className="border rounded" value={store} onInput={(e) => {setStore((e.target as HTMLInputElement).value)}}></input>
                    </div>
                    <div>
                        <div className="font-bold">Price/quantity at store</div>
                        <div>
                            $
                            <input type="text" name="store-price" className="border rounded w-12" value={storePrice} onInput={(e) => {setStorePrice((e.target as HTMLInputElement).value)}}></input>
                            &nbsp;@&nbsp;
                            <input type="text" name="store-quantity" className="border rounded w-10" value={storeQuantity} onInput={(e) => {setStoreQuantity((e.target as HTMLInputElement).value)}}></input>
                            &nbsp;
                            <input type="text" name="store-prefix" className="border rounded w-10 text-right" value={storePrefix} onInput={(e) => {setStorePrefix((e.target as HTMLInputElement).value)}}></input>
                            {unit}
                        </div>
                    </div>
                </SpaceY>

                {/* Comparison */}
                <div>
                    <div className="font-bold">Value comparison</div>
                    <div>
                        $
                        <span>{pricePerQty(Number(storePrice), Number(storeQuantity), storePrefix, Number(compQuantity), compPrefix)}</span>
                        &nbsp;/&nbsp;
                        <input type="text" name="comp-quantity" className="border rounded w-10" value={compQuantity} onInput={(e) => {setCompQuantity((e.target as HTMLInputElement).value)}}></input>
                        &nbsp;
                        <input type="text" name="comp-prefix" className="border rounded w-10 text-right" value={compPrefix} onInput={(e) => {setCompPrefix((e.target as HTMLInputElement).value)}}></input>
                        {unit}
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-2">
                    <input type="submit" className="border rounded p-2 cursor-pointer bg-[#eeeeee] hover:bg-[lightgray]" value="Confirm changes"></input>

                    <button className="border rounded p-2 cursor-pointer bg-red-400 hover:bg-red-600" onClick={() => {
                        const newItems = items.filter((item) => (item.itemName !== selectedItem.itemName));
                        setItemsAndUpdateLocalStorage(newItems);
                        hideModals();
                    }}>Remove item</button>
                </div>
            </SpaceY>
        </form>
    );
}

export default function CompareAndEditBox() {
    const { showCompareAndEditBox } = useContext(ModalsContext);
    const { selectedItem, showEditItemBox, showCompareItemBox , editItem, compareItem} = useContext(UpdateItemContext);

    if (!showCompareAndEditBox || !selectedItem) return <></>;

    return (
        <ModalBox>
            <SpaceY spacing={2}>
                <div className="flex">
                    <div className={`hover:bg-[lightgray] cursor-pointer p-2 ${showCompareItemBox ? "bg-[rgb(220,220,220)]" : ""}`} onClick={() => compareItem(selectedItem)}>Compare</div>
                    <div className={`hover:bg-[lightgray] cursor-pointer p-2 ${showEditItemBox ? "bg-[rgb(220,220,220)]" : ""}`} onClick={() => editItem(selectedItem)}>Edit</div>
                </div>

                <CompareItemBox />
                <EditItemBox showCompareAndEditBox={showCompareAndEditBox} />
            </SpaceY>
        </ModalBox>
    );
}
