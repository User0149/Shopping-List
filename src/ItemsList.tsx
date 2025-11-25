import type { itemType } from "./types";
import { pricePerQty } from "./functions.ts";

export default function ItemsList({items}: {items: Array<itemType> | null}) {
    return (
        <>
            <table className="w-[calc(100%-8*var(--spacing))]">
                <thead>
                    <tr className="border-b border-black">
                        <th className="w-[30px]"></th>
                        <th className="w-[calc(0.8*(100%-280px))]">Item</th>
                        <th className="w-[150px]">Value</th>
                        <th className="w-[calc(0.2*(100%-280px))]">Store</th>
                        <th className="w-[150px]">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (items !== null) &&
                        (items.map((item: itemType) => {
                            return (
                                <tr key={item.itemName}>
                                    <td>{Number(item.selected)}</td>
                                    <td>{item.itemName}</td>
                                    <td>{pricePerQty(item.storePrice, item.storeQuantity, item.storePrefix, item.compQuantity, item.compPrefix)}</td>
                                    <td>{item.store}</td>
                                    <td>{String(item.storePrice) + " @ " + String(item.storeQuantity) + " " + String(item.storePrefix) + String(item.unit)}</td>
                                </tr>
                            )
                        }))
                    }
                </tbody>
            </table>
            {(items === null || items.length === 0) && <div className="text-center mt-2">No items found</div>}
        </>
    );
}