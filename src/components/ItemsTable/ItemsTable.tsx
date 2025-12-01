import { useContext, useState } from "react";
import "./ItemsTable.css";

import type { itemType, setState } from "../../types/types";

import { filterItems } from "../../utils/filterItems";
import { pricePerQty } from "../../utils/pricePerQty";

import { ItemsContext } from "../../context/ItemsContext";
import { SearchContext } from "../../context/SearchContext";
import { UpdateItemContext } from "../../context/UpdateItemContext";

import SpaceY from "../SpaceY";

interface ItemsTableRowProps{
    item: itemType;
}

interface ItemsTableHeadProps {
    selectedOnly: boolean;
    setSelectedOnly: setState<boolean>;
}

interface ItemsTableBodyProps {
    selectedOnly: boolean;
}

function ItemsTableRow({ item }: ItemsTableRowProps) {
    const { items , setItemsAndUpdateLocalStorage} = useContext(ItemsContext);
    const { compareItem } = useContext(UpdateItemContext);

    // this function should never be called if `items` is null
    if (items === null) return <></>;

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

    if (items === null) return <></>;

    const matchingItems = filterItems(items, searchQuery, selectedOnly);
    return (
        <tbody>
            {
                matchingItems.map((item: itemType) => {
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
                    <col className="w-4/5"/>
                    <col className="w-[250px]"/>
                    <col className="w-1/5"/>
                    <col className="w-[280px]"/>
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