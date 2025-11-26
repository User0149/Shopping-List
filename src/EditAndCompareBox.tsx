import { useState } from "react";
import type { itemType, setState } from "./types.ts";
import { pricePerQty } from "./functions.ts";

function CompareBox({editMode, selectedItem}: {editMode: boolean, selectedItem: itemType | null}) {
    const [otherPrice, setOtherPrice] = useState<string>(selectedItem!== null ? String(selectedItem.storePrice) : "");
    const [otherQuantity, setOtherQuantity] = useState<string>(selectedItem!== null ? String(selectedItem.storeQuantity) : "");
    const [otherPrefix, setOtherPrefix] = useState<string>(selectedItem!== null ? selectedItem.storePrefix : "");
    
    if (selectedItem === null || editMode) return <></>;

    const storePricePerQty: number = Number(pricePerQty(selectedItem.storePrice, selectedItem.storeQuantity, selectedItem.storePrefix, selectedItem.compQuantity, selectedItem.compPrefix));
    const otherPricePerQty: number = Number(pricePerQty(Number(otherPrice), Number(otherQuantity), otherPrefix, selectedItem.compQuantity, selectedItem.compPrefix));

    return (
        <div className="text-2xl">
            <div>
                Price per quantity at {selectedItem.store}:
            </div>
            <div>
                ${storePricePerQty} / {selectedItem.compQuantity}&nbsp;{selectedItem.compPrefix}{selectedItem.unit}
            </div>

            <br></br>

            <div>Compare value</div>
            <div>
                $
                <input id="other-price" type="text" name="other-price" className="border rounded w-20" value={otherPrice} onInput={() => {setOtherPrice((document.getElementById("other-price") as HTMLInputElement)?.value)}}></input>
                &nbsp;@&nbsp;
                <input id="other-quantity" type="text" name="other-quantity" className="border rounded w-20" value={otherQuantity} onInput={() => {setOtherQuantity((document.getElementById("other-quantity") as HTMLInputElement)?.value)}}></input>
                &nbsp;
                <input id="other-prefix" type="text" name="other-prefix" className="border rounded w-15 text-right" value={otherPrefix} onInput={() => {setOtherPrefix((document.getElementById("other-prefix") as HTMLInputElement)?.value)}}></input>
                {selectedItem.unit}
            </div>
            <div className={otherPricePerQty < storePricePerQty ? "text-green-500" : (otherPricePerQty > storePricePerQty ? "text-red-500" : "text-yellow-500")}>
                = ${otherPricePerQty.toFixed(2)} / {selectedItem.compQuantity}&nbsp;{selectedItem.compPrefix}{selectedItem.unit}
            </div>
        </div>
    );
}

function EditBox({editMode, selectedItem, items, setItems, setShowEditAndCompareBox, invalidItem, setInvalidItem}: {editMode: boolean, selectedItem: itemType | null, items: Array<itemType> | null, setItems: (itemsArray: itemType[]) => void, setShowEditAndCompareBox: setState<boolean>, invalidItem: boolean, setInvalidItem: setState<boolean>}) {
    const [itemName, setItemName] = useState<string>(selectedItem!== null ? selectedItem.itemName : "");
    const [selected, setSelected] = useState<boolean>(selectedItem!== null ? selectedItem.selected : false);
    const [unit, setUnit] = useState<string>(selectedItem!== null ? selectedItem.unit : "");
    const [store, setStore] = useState<string>(selectedItem!== null ? selectedItem.store : "");
    const [storePrice, setStorePrice] = useState<string>(selectedItem!== null ? String(selectedItem.storePrice) : "");
    const [storeQuantity, setStoreQuantity] = useState<string>(selectedItem!== null ? String(selectedItem.storeQuantity) : "");
    const [storePrefix, setStorePrefix] = useState<string>(selectedItem!== null ? selectedItem.storePrefix : "");
    const [compQuantity, setCompQuantity] = useState<string>(selectedItem!== null ? String(selectedItem.compQuantity) : "");
    const [compPrefix, setCompPrefix] = useState<string>(selectedItem!== null ? selectedItem.compPrefix : "");

    if (selectedItem === null || !editMode) return <></>;

    return (
        <form id="edit-item-form" onSubmit={(event) => {
            event.preventDefault();
            const form = document.getElementById("edit-item-form");
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
            
            if (items !== null) {
                let invalidNewItem: boolean = false;
                for (const i of items) {
                    if (i.itemName === newItem.itemName && newItem.itemName !== selectedItem.itemName) {
                        invalidNewItem = true;
                    }
                }
                
                if (!invalidNewItem) {
                    const newItems = items.filter((item) => (item.itemName !== selectedItem.itemName));
                    newItems.push(newItem);
                    newItems.sort((a, b) =>  Number(a.itemName.localeCompare(b.itemName)));

                    setItems(newItems);
                    setShowEditAndCompareBox(false);
                }
                else {
                    setInvalidItem(true);
                }
            }
            else {
                console.log("Error: items is null");
            }
        }}>
            <div className="mb-1 text-lg font-bold">
                <label htmlFor="edit-item-name">Item name:&nbsp;</label>
                <input id="edit-item-name" type="text" name="item-name" className="border rounded" value={itemName}  onInput={() => {setItemName((document.getElementById("edit-item-name") as HTMLInputElement)?.value)}} required></input>
            </div>

            {
                invalidItem && (<div className="text-[red] text-sm">
                    There is an item with the same name.
                </div>)
            }

            <div className="mb-1">
                <label htmlFor="edit-selected">Selected&nbsp;</label>
                <input id="edit-selected" type="checkbox" name="selected" checked={selected} onChange={(event) => setSelected(event.target.checked)}></input>
            </div>
            <div className="mb-1">
                <label htmlFor="edit-unit">Base unit:&nbsp;</label>
                <input id="edit-unit" type="text" name="unit" className="border rounded w-10" value={unit} onInput={() => {setUnit((document.getElementById("edit-unit") as HTMLInputElement)?.value)}}></input>
            </div>

            <br></br>

            <div className="mb-1 text-lg">
                <label htmlFor="edit-store">Store:&nbsp;</label>
                <input id="edit-store" type="text" name="store" className="border rounded" value={store} onInput={() => {setStore((document.getElementById("edit-store") as HTMLInputElement)?.value)}}></input>
            </div>
            <div>Price/quantity at store:&nbsp;</div>
            <div className="mb-1">
                $
                <input id="edit-store-price" type="text" name="store-price" className="border rounded w-12" value={storePrice} onInput={() => {setStorePrice((document.getElementById("edit-store-price") as HTMLInputElement)?.value)}}></input>
                &nbsp;@&nbsp;
                <input id="edit-store-quantity" type="text" name="store-quantity" className="border rounded w-10" value={storeQuantity} onInput={() => {setStoreQuantity((document.getElementById("edit-store-quantity") as HTMLInputElement)?.value)}}></input>
                &nbsp;
                <input id="edit-store-prefix" type="text" name="store-prefix" className="border rounded w-10 text-right" value={storePrefix} onInput={() => {setStorePrefix((document.getElementById("edit-store-prefix") as HTMLInputElement)?.value)}}></input>
                {unit}
            </div>

            <br></br>
            <div className="mb-1">
                <div>Value comparison</div>
                <div>
                    $
                    <span>{pricePerQty(Number(storePrice), Number(storeQuantity), storePrefix, Number(compQuantity), compPrefix)}</span>
                    &nbsp;/&nbsp;
                    <input id="edit-comp-quantity" type="text" name="comp-quantity" className="border rounded w-10" value={compQuantity} onInput={() => {setCompQuantity((document.getElementById("edit-comp-quantity") as HTMLInputElement)?.value)}}></input>
                    &nbsp;
                    <input id="edit-comp-prefix" type="text" name="comp-prefix" className="border rounded w-10 text-right" value={compPrefix} onInput={() => {setCompPrefix((document.getElementById("edit-comp-prefix") as HTMLInputElement)?.value)}}></input>
                    {unit}
                </div>
            </div>

            <br></br>

            <div className="flex">
                <input type="submit" className="border rounded p-2 mr-2 cursor-pointer bg-[#eeeeee] hover:bg-[lightgray]" value="Add item"></input>
                <button className="border rounded p-2 cursor-pointer bg-red-400 hover:bg-red-600" onClick={() => {
                    if (items === null) return;
                    const newItems = items.filter((item) => (item.itemName !== selectedItem.itemName));
                    setItems(newItems);
                    setShowEditAndCompareBox(false);
                }}>Remove item</button>
            </div>
        </form>
    );
}

export default function EditAndCompareBox({selectedItem, items, setItems, showEditAndCompareBox, setShowEditAndCompareBox, editMode, setEditMode, invalidItem, setInvalidItem}: {selectedItem: itemType | null, items: Array<itemType> | null, setItems: (itemsArray: itemType[]) => void, showEditAndCompareBox: boolean, setShowEditAndCompareBox: setState<boolean>, editMode: boolean, setEditMode: setState<boolean>, invalidItem: boolean, setInvalidItem: setState<boolean>}) {
    if (!showEditAndCompareBox) return <></>;

    return (
        <div id="editAndCompareBoxBackground" className="modal-background" onClick={
            (e) => {
                if (e.target === document.getElementById("editAndCompareBoxBackground")) {
                    setShowEditAndCompareBox(false);
                }
            }
        }>
            <div className="modal-box">
                <span className="modal-close-button">&times;&nbsp;</span>
                <div className="flex mb-5">
                    <div className={`hover:bg-[lightgray] cursor-pointer p-2 ${!editMode ? "bg-[rgb(220,220,220)]" : ""}`} onClick={() => setEditMode(false)}>Compare</div>
                    <div className={`hover:bg-[lightgray] cursor-pointer p-2 ${editMode ? "bg-[rgb(220,220,220)]" : ""}`} onClick={() => setEditMode(true)}>Edit</div>
                </div>
                <CompareBox editMode={editMode} selectedItem={selectedItem}/>
                <EditBox editMode={editMode} selectedItem={selectedItem} items={items} setItems={setItems} setShowEditAndCompareBox={setShowEditAndCompareBox} invalidItem={invalidItem} setInvalidItem={setInvalidItem}/>
            </div>
        </div>
    );
}