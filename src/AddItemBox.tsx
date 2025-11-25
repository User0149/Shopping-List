import type { itemType } from "./types.ts";
import { useState } from "react";
import { pricePerQty } from "./functions.ts";

export default function AddItemBox({showAddItemBox, setShowAddItemBox, items, setItems}: {showAddItemBox: boolean, setShowAddItemBox: any, items: Array<itemType> | null, setItems: any}) {
    if (!showAddItemBox) return <></>;

    const [unit, setUnit] = useState<string>("g");
    const [storePrice, setStorePrice] = useState<string>("5");
    const [storeQuantity, setStoreQuantity] = useState<string>("1");
    const [storePrefix, setStorePrefix] = useState<string>("k");
    const [compQuantity, setCompQuantity] = useState<string>("100");
    const [compPrefix, setCompPrefix] = useState<string>("");

    return (
        <div id="addItemBoxBackground" className="modal-background" onClick={
            (e) => {
                if (e.target === document.getElementById("addItemBoxBackground")) {
                    setShowAddItemBox(false);
                }
            }
        }>
            <div className="modal-box">
                <span className="modal-close-button">&times;&nbsp;</span>
                <h2>Add an item</h2>
                <form id="add-item-form" onSubmit={(event) => {
                    // TODO: check duplicate
                    event.preventDefault();
                    const form = document.getElementById("add-item-form");
                    const formData = Object.fromEntries(new FormData(form as HTMLFormElement).entries());
                    
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

                    items?.push(newItem);
                    setItems(items);
                    
                    setShowAddItemBox(false);
                }}>
                    <div className="mb-1 text-lg font-bold">
                        <label htmlFor="item-name">Item name:&nbsp;</label>
                        <input id="item-name" type="text" name="item-name" className="border rounded" required></input>
                    </div>

                    <div className="mb-1">
                        <label htmlFor="selected">Selected&nbsp;</label>
                        <input id="selected" type="checkbox" name="selected"></input>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="unit">Base unit:&nbsp;</label>
                        <input id="unit" type="text" name="unit" className="border rounded w-10" value={unit} onInput={() => {setUnit((document.getElementById("unit") as HTMLInputElement)?.value)}}></input>
                    </div>

                    <br></br>

                    <div className="mb-1 text-lg">
                        <label htmlFor="store">Store:&nbsp;</label>
                        <input id="store" type="text" name="store" className="border rounded"></input>
                    </div>
                    <div>Price/quantity at store:&nbsp;</div>
                    <div className="mb-1">
                        $
                        <input id="store-price" type="text" name="store-price" className="border rounded w-12" value={storePrice} onInput={() => {setStorePrice((document.getElementById("store-price") as HTMLInputElement)?.value)}}></input>
                        &nbsp;@&nbsp;
                        <input id="store-quantity" type="text" name="store-quantity" className="border rounded w-10" value={storeQuantity} onInput={() => {setStoreQuantity((document.getElementById("store-quantity") as HTMLInputElement)?.value)}}></input>
                        &nbsp;
                        <input id="store-prefix" type="text" name="store-prefix" className="border rounded w-10 text-right" value={storePrefix} onInput={() => {setStorePrefix((document.getElementById("store-prefix") as HTMLInputElement)?.value)}}></input>
                        {unit}
                    </div>

                    <br></br>
                    <div className="mb-1">
                        <div>Value comparison</div>
                        <div>
                            $
                            <span>{pricePerQty(Number(storePrice), Number(storeQuantity), storePrefix, Number(compQuantity), compPrefix)}</span>
                            /
                            <input id="comp-quantity" type="text" name="comp-quantity" className="border rounded w-10" value={compQuantity} onInput={() => {setCompQuantity((document.getElementById("comp-quantity") as HTMLInputElement)?.value)}}></input>
                            &nbsp;
                            <input id="comp-prefix" type="text" name="comp-prefix" className="border rounded w-10 text-right" value={compPrefix} onInput={() => {setCompPrefix((document.getElementById("comp-prefix") as HTMLInputElement)?.value)}}></input>
                            {unit}
                        </div>
                    </div>

                    <br></br>

                    <input type="submit" className="border rounded p-2 cursor-pointer bg-[#eeeeee] hover:bg-[lightgray]" value="Add item"></input>
                </form>
            </div>
        </div>
    );
}