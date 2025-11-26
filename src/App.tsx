import { useState } from "react";
import "./App.css";

import type { itemType } from "./types.ts"
import Header from "./Header.tsx";
import ItemsList from "./ItemsList.tsx";
import AddItemBox from "./AddItemBox.tsx";
import EditAndCompareBox from "./EditAndCompareBox.tsx";

export default function App() {
    const [items, setItems] = useState<Array<itemType> | null>(localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items") as string) : null);
    const [showAddItemBox, setShowAddItemBox] = useState<boolean>(false);
    const [showEditAndCompareBox, setShowEditAndCompareBox] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<itemType | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    
    const setItemsAndUpdateLocalStorage = (itemsArray: Array<itemType>) => {
        localStorage.setItem("items", JSON.stringify(itemsArray));
        setItems(itemsArray);
    };

    const showEditAndCompare = (item: itemType) => {
        setShowEditAndCompareBox(true);
        setSelectedItem(item);
    }

    if (items === null) {
        setItemsAndUpdateLocalStorage([]);
    }

    return (
        <>
            <h1>Shopping List</h1>
            <Header setShowAddItemBox={setShowAddItemBox} setSearchQuery={setSearchQuery}/>

            <ItemsList items={items} searchQuery={searchQuery} showEditAndCompare={showEditAndCompare}/>

            <AddItemBox showAddItemBox={showAddItemBox} setShowAddItemBox={setShowAddItemBox} items={items} setItems={setItemsAndUpdateLocalStorage}/>
            <EditAndCompareBox selectedItem={selectedItem} items={items} setItems={setItems} showEditAndCompareBox={showEditAndCompareBox} setShowEditAndCompareBox={setShowEditAndCompareBox}/>
        </>
    )
}
