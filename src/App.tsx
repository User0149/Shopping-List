import { useState } from "react";
import "./App.css";

import Header from "./Header.tsx";
import ItemsList from "./ItemsList.tsx";
import AddItemBox from "./AddItemBox.tsx";

export default function App() {
    const [items, setItems] = useState<string | null>(localStorage.getItem("items"));
    const [showAddItemBox, setShowAddItemBox] = useState<boolean>(false);
    
    const setItemsAndUpdateLocalStorage = (stringifiedObj: string) => {
        localStorage.setItem("items", stringifiedObj);
        setItems(stringifiedObj);
    };

    if (items === null) {
        setItemsAndUpdateLocalStorage(JSON.stringify([]));
    }

    return (
        <>
            <h1>Shopping List</h1>
            <Header setShowAddItemBox={setShowAddItemBox}/>

            <ItemsList items={items}/>

            <AddItemBox showAddItemBox={showAddItemBox} setShowAddItemBox={setShowAddItemBox} items={items} setItems={setItems}/>
        </>
    )
}
