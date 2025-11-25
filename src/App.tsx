import { useState } from "react";
import "./App.css";

import type { itemType } from "./types.ts"
import Header from "./Header.tsx";
import ItemsList from "./ItemsList.tsx";
import AddItemBox from "./AddItemBox.tsx";

export default function App() {
    const [items, setItems] = useState<Array<itemType> | null>(localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items") as string) : null);
    const [showAddItemBox, setShowAddItemBox] = useState<boolean>(false);
    
    const setItemsAndUpdateLocalStorage = (itemsArray: Array<itemType>) => {
        localStorage.setItem("items", JSON.stringify(itemsArray));
        setItems(itemsArray);
    };

    if (items === null) {
        setItemsAndUpdateLocalStorage([]);
    }

    return (
        <>
            <h1>Shopping List</h1>
            <Header setShowAddItemBox={setShowAddItemBox}/>

            <ItemsList items={items}/>

            <AddItemBox showAddItemBox={showAddItemBox} setShowAddItemBox={setShowAddItemBox} items={items} setItems={setItemsAndUpdateLocalStorage}/>
        </>
    )
}
