import { useContext } from "react";
import "../styles/utilities.css";

import { SearchContext } from "../context/SearchContext";
import { UpdateItemContext } from "../context/UpdateItemContext";
import SpaceY from "./SpaceY";

function SearchBar() {
    const { setSearchQuery } = useContext(SearchContext);

    return (
        <div>
            <input name="search-bar" className="w-9/10 rounded-full border block m-auto text-xl p-3" placeholder="Search for an item" onInput={(e) => {
                setSearchQuery((e.target as HTMLInputElement).value);
            }}></input>
        </div>
    );
}

function AddItemButton() {
    const { addItem } = useContext(UpdateItemContext);

    return (
        <div>
            <span className="text-blue-800 underline cursor-pointer" onClick={() => addItem()}>
                + Add item
            </span>
        </div>
    );
}

export default function Header() {
    return (
        <SpaceY spacing={5}>
            <SearchBar />
            <AddItemButton />
        </SpaceY>
    );
}