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
    const [invalidItem, setInvalidItem] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<itemType | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selectedOnly, setSelectedOnly] = useState<boolean>(false);
    
    const setItemsAndUpdateLocalStorage = (itemsArray: Array<itemType>) => {
        localStorage.setItem("items", JSON.stringify(itemsArray));
        setItems(itemsArray);
    };

    const showEditAndCompare = (item: itemType) => {
        setSelectedItem(item);
        setEditMode(false);
        setInvalidItem(false);
        setShowEditAndCompareBox(true);
    }

    if (items === null) {
        setItemsAndUpdateLocalStorage([]);
    }

    return (
        <>
            <h1>Shopping List</h1>
            <Header setShowAddItemBox={setShowAddItemBox} setSearchQuery={setSearchQuery}/>

            <ItemsList items={items} setItems={setItemsAndUpdateLocalStorage} searchQuery={searchQuery} showEditAndCompare={showEditAndCompare} setInvalidItem={setInvalidItem} selectedOnly={selectedOnly} setSelectedOnly={setSelectedOnly}/>

            <AddItemBox showAddItemBox={showAddItemBox} setShowAddItemBox={setShowAddItemBox} invalidItem={invalidItem} setInvalidItem={setInvalidItem} items={items} setItems={setItemsAndUpdateLocalStorage}/>
            <EditAndCompareBox selectedItem={selectedItem} items={items} setItems={setItemsAndUpdateLocalStorage} showEditAndCompareBox={showEditAndCompareBox} setShowEditAndCompareBox={setShowEditAndCompareBox} editMode={editMode} setEditMode={setEditMode} invalidItem={invalidItem} setInvalidItem={setInvalidItem}/>
        </>
    )
}
