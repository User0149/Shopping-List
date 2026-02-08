import { useContext, useState } from "react";
import "./ItemsTable.css";

import type { Item, StateSetter } from "../../types/types";

import { filterItems } from "../../utils/filterItems";
import { pricePerQty } from "../../utils/pricePerQty";

import { ItemsContext } from "../../context/ItemsContext";
import { SearchContext } from "../../context/SearchContext";
import { UpdateItemContext } from "../../context/UpdateItemContext";

import SpaceY from "../SpaceY";

interface ItemsTableRowProps{
    item: Item;
}

interface ItemsTableHeadProps {
    selectedOnly: boolean;
    setSelectedOnly: StateSetter<boolean>;
}

interface ItemsTableBodyProps {
    selectedOnly: boolean;
}

function ItemsTableRow({ item }: ItemsTableRowProps) {
    const { items , setItemsAndUpdateLocalStorage} = useContext(ItemsContext);
    const { compareItem } = useContext(UpdateItemContext);

    return (
        <tr className="cursor-pointer" onClick={(event) => {
            if ((event.target as HTMLElement).tagName !== "INPUT") {
                compareItem(item);
            }
        }}>
            <td>
                <input type="checkbox" checked={item.selected} onChange={() => {
                    setItemsAndUpdateLocalStorage(items.map(i => ({
                        ...i,
                        selected: (item.itemName === i.itemName ? !i.selected : i.selected)
                    })));
                }}></input>
            </td>
            <td>
                {item.itemName}
            </td>
            <td>
                {"$" + pricePerQty(item.storePrice, item.storeQuantity, item.storePrefix, item.compQuantity, item.compPrefix) + " / " + String(item.compQuantity) + " " + String(item.compPrefix) + String(item.unit)}
                </td>
            <td>
                {item.store}
                </td>
            <td>
                {"$" + item.storePrice.toFixed(2) + " @ " + String(item.storeQuantity) + " " + String(item.storePrefix) + String(item.unit)}
            </td>
        </tr>
    );
}

function ItemsTableHead({ selectedOnly, setSelectedOnly }: ItemsTableHeadProps) {
    return (
        <thead className="sticky top-0 z-1 bg-[white] border-b border-black">
            <tr>
                <th>
                    <input type="checkbox" checked={selectedOnly} onChange={() => {
                        setSelectedOnly(!selectedOnly);
                    }}></input>
                </th>
                <th>
                    Item
                </th>
                <th>
                    Value
                </th>
                <th>
                    Store
                </th>
                <th>
                    Price
                </th>
            </tr>
        </thead>
    );
}

function ItemsTableBody({ selectedOnly }: ItemsTableBodyProps) {
    const { items } = useContext(ItemsContext);
    const { searchQuery } = useContext(SearchContext);

    const matchingItems = filterItems(items, searchQuery, selectedOnly);
    return (
        <tbody>
            {
                matchingItems.map((item: Item) => {
                    return <ItemsTableRow key={item.itemName} item={item} />;
                })
            }                
        </tbody>
    );
}

export default function ItemsTable() {
    const [selectedOnly, setSelectedOnly] = useState<boolean>(false);

    const { items } = useContext(ItemsContext);
    const { searchQuery } = useContext(SearchContext);

    return (
        <SpaceY spacing={2}>
            <table className="table-fixed w-full">
                <colgroup>
                    <col className="w-[50px]"/>
                    <col className="w-3/8"/>
                    <col className="w-1/8"/>
                    <col className="w-3/8"/>
                    <col className="w-1/8"/>
                </colgroup>
                <ItemsTableHead selectedOnly={selectedOnly} setSelectedOnly={setSelectedOnly} />
                <ItemsTableBody selectedOnly={selectedOnly} />
            </table>
            {
                (items === null || filterItems(items, searchQuery, selectedOnly).length === 0) && 
                <div className="text-center">No items found</div>
            }
        </SpaceY>
    );
}
