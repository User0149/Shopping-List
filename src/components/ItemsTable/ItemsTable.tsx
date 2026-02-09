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

    const itemName = item.itemName;
    const itemValue = "$" + pricePerQty(item.storePrice, item.storeQuantity, item.storePrefix, item.compQuantity, item.compPrefix) + " / " + String(item.compQuantity) + " " + String(item.compPrefix) + String(item.unit);
    const itemStore = item.store;
    const itemPrice = "$" + item.storePrice.toFixed(2) + " @ " + String(item.storeQuantity) + " " + String(item.storePrefix) + String(item.unit);

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

            {/* Mobile cell */}
            <td className="table-cell sm:hidden">
                {itemName}&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;{itemValue}&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;{itemStore}&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;{itemPrice}
            </td>

            {/* Desktop cells */}
            <td className="hidden sm:table-cell">
                {itemName}
            </td>
            <td className="hidden sm:table-cell">
                {itemValue}
            </td>
            <td className="hidden sm:table-cell">
                {itemStore}
            </td>
            <td className="hidden sm:table-cell">
                {itemPrice}
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

                {/* Mobile header */}
                <th className="table-cell sm:hidden">
                    Item&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;Value&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;Store&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;Price
                </th>

                {/* Desktop headers */}
                <th className="hidden sm:table-cell">
                    Item
                </th>
                <th className="hidden sm:table-cell">
                    Value
                </th>
                <th className="hidden sm:table-cell">
                    Store
                </th>
                <th className="hidden sm:table-cell">
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
            {/* Table for mobile screens */}
            <table className="table-fixed w-full table sm:hidden text-sm sm:text-base">
                <colgroup>
                    <col className="w-[25px]"/>
                    <col className="w-full"/>
                </colgroup>
                <ItemsTableHead selectedOnly={selectedOnly} setSelectedOnly={setSelectedOnly} />
                <ItemsTableBody selectedOnly={selectedOnly} />
            </table>

            {/* Table for larger screens */}
            <table className="table-fixed w-full hidden sm:table">
                <colgroup>
                    <col className="w-[25px]"/>
                    <col className="w-3/8"/>
                    <col className="w-1/8"/>
                    <col className="w-3/8"/>
                    <col className="w-1/8"/>
                </colgroup>
                <ItemsTableHead selectedOnly={selectedOnly} setSelectedOnly={setSelectedOnly} />
                <ItemsTableBody selectedOnly={selectedOnly} />
            </table>

            {/* No items matched the search */}
            {
                (filterItems(items, searchQuery, selectedOnly).length === 0) && 
                <div className="text-center">No items found</div>
            }
        </SpaceY>
    );
}
