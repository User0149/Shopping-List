import type { itemType } from "./types";
import { pricePerQty } from "./functions.ts";

export default function ItemsList({items, searchQuery, showEditAndCompare}: {items: Array<itemType> | null, searchQuery: string, showEditAndCompare: any}) {
    return (
        <>
            <table id="items-table" className="w-[calc(100%-8*var(--spacing))]">
                <thead>
                    <tr className="border-b border-black">
                        <th className="w-[30px] text-left"></th>
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
                            return item.itemName.toLowerCase().includes(searchQuery);
                        }).map((item: itemType) => {
                            return (
                                <tr key={item.itemName} className="cursor-pointer" onClick={() => showEditAndCompare(item)}>
                                    <td>{Number(item.selected)}</td>
                                    <td>{item.itemName}</td>
                                    <td>{"$" + pricePerQty(item.storePrice, item.storeQuantity, item.storePrefix, item.compQuantity, item.compPrefix) + " / " + String(item.compQuantity) + " " + String(item.compPrefix) + String(item.unit)}</td>
                                    <td>{item.store}</td>
                                    <td>{"$" + String(item.storePrice) + " @ " + String(item.storeQuantity) + " " + String(item.storePrefix) + String(item.unit)}</td>
                                </tr>
                            )
                        }))
                    }
                </tbody>
            </table>
            {
                (items === null || items.filter((item: itemType) => {
                    return item.itemName.toLowerCase().includes(searchQuery);
                }).length === 0) && 
                <div className="text-center mt-2">No items found</div>
            }
        </>
    );
}