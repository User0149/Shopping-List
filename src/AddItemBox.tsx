import { useState } from "react";

function pricePerQty(price: number, quantity: number, prefix: string, compQuantity: number, compPrefix: string): string {
    type prefixType = "m" | "c" | "d" | "k";
    const multipliers = {"m": 0.001, "c": 0.01, "d": 0.1, "": 1, "k": 1000}; 
    const base_ppq: number = price / (quantity * (prefix in multipliers ? multipliers[prefix as prefixType] : NaN)); // price per unit quantity

    const wanted_quantity = compQuantity * (compPrefix in multipliers ? multipliers[compPrefix as prefixType] : NaN);

    return base_ppq * wanted_quantity as unknown as string;
}

export default function AddItemBox({showAddItemBox, setShowAddItemBox, items, setItems}: {showAddItemBox: boolean, setShowAddItemBox: any, items: string | null, setItems: any}) {
    if (!showAddItemBox) return <></>;

    const [unit, setUnit] = useState<string>("g");
    const [storePrice, setStorePrice] = useState<number>(6.40);
    const [storeQuantity, setStoreQuantity] = useState<number>(2.0);
    const [storePrefix, setStorePrefix] = useState<string>("k");
    const [compQuantity, setCompQuantity] = useState<number>(100);
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
                <form>
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
                        <input id="unit" type="text" className="border rounded w-10" value={unit} onInput={() => {setUnit((document.getElementById("unit") as HTMLInputElement)?.value)}}></input>
                    </div>

                    <br></br>

                    <div className="mb-1 text-lg">
                        <label htmlFor="store">Store:&nbsp;</label>
                        <input id="store" type="text" name="store" className="border rounded"></input>
                    </div>
                    <div>Price/quantity at store:&nbsp;</div>
                    <div className="mb-1">
                        $
                        <input id="store-price" type="text" name="store-price" className="border rounded w-12" value={storePrice} onInput={() => {setStorePrice(Number((document.getElementById("store-price") as HTMLInputElement)?.value))}}></input>
                        &nbsp;@&nbsp;
                        <input id="store-quantity" type="text" name="store-quantity" className="border rounded w-10" value={storeQuantity} onInput={() => {setStoreQuantity(Number((document.getElementById("store-quantity") as HTMLInputElement)?.value))}}></input>
                        &nbsp;
                        <input id="store-prefix" type="text" name="store-prefix" className="border rounded w-10 text-right" value={storePrefix} onInput={() => {setStorePrefix((document.getElementById("store-prefix") as HTMLInputElement)?.value)}}></input>
                        {unit}
                    </div>

                    <br></br>
                    <div className="mb-1">
                        <div>Value comparison</div>
                        <div>
                            $
                            <span>{pricePerQty(storePrice, storeQuantity, storePrefix, compQuantity, compPrefix)}</span>
                            /
                            <input id="comp-quantity" type="text" name="comp-quantity" className="border rounded w-10" value={compQuantity} onInput={() => {setCompQuantity(Number((document.getElementById("comp-quantity") as HTMLInputElement)?.value))}}></input>
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