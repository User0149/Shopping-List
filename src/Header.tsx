function SearchBar({setSearchQuery}: {setSearchQuery: any}) {
    return (
        <input id="search-bar" className="search_bar block m-auto text-xl p-3" placeholder="Search for an item" onInput={
            () => {
                setSearchQuery((document.getElementById("search-bar") as HTMLInputElement).value);
            }
        }></input>
    );
}

function AddItemButton({setShowAddItemBox}: {setShowAddItemBox: any}) {
    return (
        <div className="mt-4 mb-4">
            <span className="text-blue-800 underline cursor-pointer" onClick={() => setShowAddItemBox(true)}>
                + Add item
            </span>
        </div>
    );
}

export default function Header({setShowAddItemBox, setSearchQuery}: {setShowAddItemBox: any, setSearchQuery: any}) {
    return (
        <>
            <SearchBar setSearchQuery={setSearchQuery}/>
            <AddItemButton setShowAddItemBox={setShowAddItemBox}/>
        </>
    );
}