import type { itemType, setState } from "./types";
import { pricePerQty } from "./functions.ts";

export default function ItemsList({items, setItems, searchQuery, showEditAndCompare, setInvalidItem, selectedOnly, setSelectedOnly}: {items: Array<itemType> | null, setItems: (itemsArray: itemType[]) => void, searchQuery: string, showEditAndCompare: (item: itemType) => void, setInvalidItem: setState<boolean>, selectedOnly: boolean, setSelectedOnly: setState<boolean>}) {
    return (
        <div className="overflow-auto no-scrollbar h-[calc(100%-156px)]">
            <table id="items-table" className="w-[calc(100%-8*var(--spacing))]">
                <thead className="sticky border-b border-black">
                    <tr>
                        <th className="w-[30px] text-left"><input type="checkbox" checked={selectedOnly} onChange={() => setSelectedOnly(!selectedOnly)}></input></th>
                        <th className="w-[calc(0.8*(100%-530px))] text-left">Item</th>
                        <th className="w-[250px] text-left">Value</th>
                        <th className="w-[calc(0.2*(100%-530px))] text-left">Store</th>
                        <th className="w-[250px] text-left">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (items !== null) &&
                        (items.filter((item: itemType) => {
                            return item.itemName.toLowerCase().includes(searchQuery.toLowerCase());
                        }).filter((item: itemType) => {
                            return !selectedOnly || item.selected;
                        }).map((item: itemType) => {
                            return (
                                <tr key={item.itemName} className="cursor-pointer" onClick={(event) => {
                                    if ((event.target as HTMLElement).tagName !== "INPUT") {
                                        setInvalidItem(false);
                                        showEditAndCompare(item);
                                    }
                                }}>
                                    <td><input type="checkbox" checked={item.selected} onChange={() => {
                                        setItems(items.map(i => ({
                                            ...i,
                                            selected: (item.itemName === i.itemName ? !i.selected : i.selected)
                                        })));
                                    }}></input></td>
                                    <td>{item.itemName}</td>
                                    <td>{"$" + pricePerQty(item.storePrice, item.storeQuantity, item.storePrefix, item.compQuantity, item.compPrefix) + " / " + String(item.compQuantity) + " " + String(item.compPrefix) + String(item.unit)}</td>
                                    <td>{item.store}</td>
                                    <td>{"$" + item.storePrice.toFixed(2) + " @ " + String(item.storeQuantity) + " " + String(item.storePrefix) + String(item.unit)}</td>
                                </tr>
                            )
                        }))
                    }
                </tbody>
            </table>
            {
                (items === null || items.filter((item: itemType) => {
                    return item.itemName.toLowerCase().includes(searchQuery);
                }).filter((item: itemType) => {
                    return !selectedOnly || item.selected;
                }).length === 0) && 
                <div className="text-center mt-2">No items found</div>
            }
        </div>
    );
}