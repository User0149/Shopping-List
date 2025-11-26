import type { setState } from "./types";

function SearchBar({setSearchQuery}: {setSearchQuery: setState<string>}) {
    return (
        <input id="search-bar" className="search_bar block m-auto text-xl p-3" placeholder="Search for an item" onInput={
            () => {
                setSearchQuery((document.getElementById("search-bar") as HTMLInputElement).value);
            }
        }></input>
    );
}

function AddItemButton({setShowAddItemBox}: {setShowAddItemBox: setState<boolean>}) {
    return (
        <div className="mt-4 mb-4">
            <span className="text-blue-800 underline cursor-pointer" onClick={() => setShowAddItemBox(true)}>
                + Add item
            </span>
        </div>
    );
}

export default function Header({setShowAddItemBox, setSearchQuery}: {setShowAddItemBox: setState<boolean>, setSearchQuery: setState<string>}) {
    return (
        <>
            <SearchBar setSearchQuery={setSearchQuery}/>
            <AddItemButton setShowAddItemBox={setShowAddItemBox}/>
        </>
    );
}